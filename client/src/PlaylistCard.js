import React from 'react';

const PlaylistCard = ({ name, tracks }) => (
    <div className="playlist-card">
        <h3>{name}</h3>
        <p>Tracks: {tracks.length}</p>
    </div>
);

export default PlaylistCard;
