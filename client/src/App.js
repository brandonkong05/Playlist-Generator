import {useEffect, useState} from "react";
import './App.css';

import Navbar from './Navbar.js';
import Hero from './Hero.js';
import Main from './Main.js';
import PlaylistCard from './PlaylistCard.js';

const auth_endpoint = 'https://accounts.spotify.com/authorize';
const client_id = '77bb375aeb0d4d6ca9789cb98880c41b';
const redirect_uri = 'http://localhost:3001/callback';
const scope = ['playlist-modify-private', 'playlist-modify-public', 'user-read-private']

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
  const [playlistName, setPlaylistName] = useState("New Playlist");
  const limit = 20;
  let playlist_id; //Playlist ID for adding tracks to playlist
  const country = "US";
  const [genre, setGenre] = useState("Enter genre in lowercase");
  const [target_acousticness, setAcousticness] = useState(0.5);
  const [target_danceability, setDanceability] = useState(0.5);
  const [target_energy, setEnergy] = useState(0.5);
  const [target_instrumentalness, setInstrumentalness] = useState(0.5);
  const [target_loudness, setLoudness] = useState(-30.5); 
  const [target_tempo, setTempo] = useState(60);
  const [target_valence, setValence] = useState(0.5); //How positive/negative a song is emotionally

  const [playlists, setPlaylists] = useState([]) //For displaying playlists

  // Possible genres
  const genreArray =[
    "acoustic","afrobeat","alt-rock","alternative","ambient","anime","black-metal","bluegrass","blues",
    "bossanova","brazil","breakbeat","british","cantopop","chicago-house","children","chill","classical",
    "club","comedy","country","dance","dancehall","death-metal","deep-house","detroit-techno","disco",
    "disney","drum-and-bass","dub","dubstep","edm","electro","electronic","emo","folk","forro","french",
    "funk","garage","german","gospel","goth","grindcore","groove","grunge","guitar",
    "happy","hard-rock","hardcore","hardstyle","heavy-metal","hip-hop","holidays","honky-tonk","house",
    "idm","indian","indie","indie-pop","industrial","iranian","j-dance","j-idol","j-pop","j-rock",
    "jazz","k-pop","kids","latin","latino","malay","mandopop","metal","metal-misc","metalcore",
    "minimal-techno","movies","mpb","new-age","new-release","opera","pagode","party","philippines-opm",
    "piano","pop","pop-film","post-dubstep","power-pop","progressive-house","psych-rock","punk",
    "punk-rock","r-n-b","rainy-day","reggae","reggaeton","road-trip","rock","rock-n-roll","rockabilly",
    "romance","sad","salsa","samba","sertanejo","show-tunes","singer-songwriter","ska","sleep","songwriter",
    "soul","soundtracks","spanish","study","summer","swedish","synth-pop","tango","techno","trance",
    "trip-hop","turkish","work-out","world-music"
  ];

  /*
    Attempt to get token upon first render
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
      getId();
    }
  }, [token]);

  //Set playlist parameters back to defaults whenever a new one is created
  useEffect(() => {
    setPlaylistName("New Playlist");
    setGenre("Enter genre in lowercase");
    setAcousticness(0.5);
    setDanceability(0.5);
    setEnergy(0.5);
    setInstrumentalness(0.5);
    setLoudness(-30.5);
    setTempo(60);
    setValence(0.5);
  }, [playlists])

  const getId = async () => {
    fetch('https://api.spotify.com/v1/me', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => {
        setUserId(data.id);
      });
  }

  /* 
    Generating a playlist of recommended songs requires:
      - Generating an empty playlist
      - Getting recommended tracks based on user's parameters
      - Adding each track to the empty playlist
  */
  const createEmptyPlaylist = async () => {
    fetch('http://localhost:3000/create-empty-playlist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({token: token, user_id: user_id, name: playlistName})
    })
      .then(response => response.json())
      .then(data => {
        playlist_id = data.id;
      });
  } 

  //Gets recommended tracks, adds tracks to empty playlist, and saves info on new playlist (currently name and number of tracks) for display
  const getRecommendations = async () => {
    let links = [];
    fetch('http://localhost:3000/get-recommendations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
        {token: token, country: country, genre: genre, 
          target_acousticness: target_acousticness, 
          target_danceability: target_danceability, target_energy: target_energy, 
          target_instrumentalness: target_instrumentalness, target_loudness: target_loudness, 
          target_tempo: target_tempo, target_valence: target_valence})
    })
      .then(response => response.json())
      .then(data => {
        data.tracks.map(track => links.push(track.uri));
        const JSONuris = {
          uris: links
        }
        addTracksToPlaylist(token, playlist_id, JSONuris);
        setPlaylists(oldPlaylists => [...oldPlaylists, {name: playlistName, num_tracks: limit}])
      })
  } 
  
  const addTracksToPlaylist = async (token, playlist_id, uris) => {
    fetch('http://localhost:3000/add-tracks-to-playlist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: token, playlist_id: playlist_id, uris: uris })
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        console.log('Tracks added successfully');
      });
  }

  const handleCreatePlaylist = async () => {
    if(genreArray.includes(genre)){
      await createEmptyPlaylist();
      await getRecommendations();
    }
    else{
      setGenre("Enter a valid spotify genre")
    }
  }

  return (
    <div className="App">
      <Navbar />
      <Hero />
      {!token && (
        <a href={`${auth_endpoint}?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope.join("%20")}&response_type=token&show_dialog=true`}>
          Log in to Spotify
        </a>
      )}
      {token && (
        <Main token={token} playlistName={playlistName} setPlaylistName={setPlaylistName}
        genre={genre} setGenre={setGenre} target_acousticness={target_acousticness} setAcousticness={setAcousticness} 
        target_danceability={target_danceability} setDanceability={setDanceability} target_energy={target_energy} 
        setEnergy={setEnergy} target_instrumentalness={target_instrumentalness} setInstrumentalness={setInstrumentalness} 
        target_loudness={target_loudness} setLoudness={setLoudness} 
        target_tempo={target_tempo} setTempo={setTempo} target_valence={target_valence} 
        setValence={setValence} handleCreatePlaylist={handleCreatePlaylist} />
      )}
      <PlaylistCard playlists={playlists} />
    </div>
  );
}


export default App;
