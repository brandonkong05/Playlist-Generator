import React from 'react';

function PlaylistCard({ playlists }) {
    //LOOP THRU PLAYLISTS
    //Each item is an object {name, num_tracks}
    //Display both for each playlist 
    const map = playlists.map(playlists => 
        <div style={{marginTop: 5, marginBottom: 10}}>
            <div> Playlist Name: {playlists.name }</div>
            <div> Track Numbers: {playlists.num_tracks}</div>
            <div> Playlist Successfully Created. Check Spotify</div>
        </div>
    )

    return map
};

export default PlaylistCard;
