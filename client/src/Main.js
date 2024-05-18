import React from 'react';

const Main = ({ token, handleCreatePlaylist, getRecommendation }) => (
    <div className="main">
        {token ? (
            <>
                <div>Successful login. Token = {token}</div>
                <button onClick={handleCreatePlaylist}>Create Playlist</button>
                <button onClick={() => getRecommendation('classical', 0.5)}>Get Recommendations</button>
            </>
        ) : (
            <a href={`https://accounts.spotify.com/authorize?client_id=your-client-id&redirect_uri=http://localhost:3001/callback&scope=playlist-modify-private%20playlist-modify-public%20user-read-private&response_type=token&show_dialog=true`}>
                Log in to Spotify
            </a>
        )}
    </div>
);

export default Main;
