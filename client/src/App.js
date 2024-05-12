import {useEffect, useState} from "react";
import './App.css';

const auth_endpoint = 'https://accounts.spotify.com/authorize';
const client_id = '77bb375aeb0d4d6ca9789cb98880c41b';
const redirect_uri = 'http://localhost:3001/callback';
const scope = ['playlist-modify-private', 'playlist-modify-public']

/* 
  In order to access the Spotify web API, you need an access token.
  To obtain one, you log in to your Spotify account, which then
  redirects you to a new link with the access token stored after the
  # symbol in the URL along with the token type (Bearer) and the
  duration of the token (3600 seconds).
*/
const getLoginInfo = () => {
  const hash_fragment = window.location.hash.substring(1);
  const keyvalue_pairs = hash_fragment.split("&");
  const login_info = {};

  for (let i = 0; i < keyvalue_pairs.length; i++) {
    const pair = keyvalue_pairs[i].split("=");
    if (pair[0]) {
      login_info[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
    }
  }

  return login_info;
}

function App() {
  const [token, setToken] = useState(null);
  const [user_id, setUserId] = useState(null);
  const [country, setCountry] = useState(null); //Country code for generating recommended tracks
  const [playlist_id, setPlaylistId] = useState(null); //Playlist ID for adding tracks to playlist
  const [genres, setGenres] = useState(null); //Possible genres to create dropdown menu for users to select

  /*
    Attempt to get token every time page rerenders, which occurs when
    you are redirected back from the Spotify login page
  */
  useEffect(() => {
    const login_info = getLoginInfo();
    window.location.hash = ""; //Remove access token info from URL since the token has been saved and no longer needs to be displayed
    const new_token = login_info.access_token;
    if (new_token) {
      setToken(new_token);
    }
  },[]);

  //Get necessary user info for playlist creation once token is retrieved
  useEffect(() => {
    if (token) {
      getIdCountry();
      getGenres();
    }
  }, [token]);

  const getIdCountry = async () => {
    fetch('https://api.spotify.com/v1/me', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => {
        setUserId(data.id);
        setCountry(data.country);
      });
  }

  const getGenres = async () => {
    fetch('https://api.spotify.com/v1/recommendations/available-genre-seeds', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => {
        setGenres(data);
        console.log(data);
      });
  }

  /* 
    Generating a playlist of recommended songs requires:
      - Generating an empty playlist
      - Getting recommended tracks based on user's parameters
      - Adding each track to the empty playlist
  */
  /*
    CURRENTLY PLAYLIST IS DEFAULT NAMED 'New Playlist'
    MAYBE ALLOW USER TO ENTER DESIRED NAME IN WHICH CASE NAME
    NEEDS TO BE A PARAM IN createEmptyPlaylist
  */
  const createEmptyPlaylist = async () => {
    fetch('http://localhost:3000/create-empty-playlist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({token: token, user_id: user_id, name: 'New Playlist'})
    })
      .then(response => response.json())
      .then(data => {
        setPlaylistId(data.id);
        console.log('Playlist ID:', data.id);
      });
  } 

  return (
    <div className="App">
      {!token && (
        <a href={`${auth_endpoint}?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope.join("%20")}&response_type=token&show_dialog=true`}>Log in to Spotify</a>
      )}
      {token && (
        <div>
          <div>Successful login. Token = {token}</div>
          <button onClick={() => createEmptyPlaylist()}>Create Playlist</button>
        </div>
      )}
    </div>
  );
}


export default App;
