import React from 'react';

function Main({ token, playlistName, setPlaylistName, genre, setGenre, target_acousticness, setAcousticness, target_danceability, setDanceability, target_energy, setEnergy, target_instrumentalness, setInstrumentalness, target_loudness, setLoudness, target_tempo, setTempo, target_valence, setValence, handleCreatePlaylist }) {
    const handleName = (event) => {
        setPlaylistName(event.target.value);
    }

    const handleAcousticness = (event) => {
        setAcousticness(event.target.value);
    }

    const handleDanceability = (event) => {
        setDanceability(event.target.value);
    }

    const handleEnergy = (event) => {
        setEnergy(event.target.value);
    }

    const handleInstrumentalness = (event) => {
        setInstrumentalness(event.target.value);
    }

    const handleLoudness = (event) => {
        setLoudness(event.target.value);
    }

    const handleTempo = (event) => {
        setTempo(event.target.value);
    }

    const handleValence = (event) => {
        setValence(event.target.value);
    }
    
    const handleGenre = (event) => {
        setGenre(event.target.value);
    }

    return (
        <div className="main">
            <div className="controls">
                    <input type="text" value={playlistName} onChange={handleName}/>
                    <input type="text" value={genre} onChange={handleGenre}/>
                    <input type="range" min="0" max="1" step="0.01" value={target_acousticness} onChange={handleAcousticness} />
                    <input type="range" min="0" max="1" step="0.01" value={target_danceability} onChange={handleDanceability} />
                    <input type="range" min="0" max="1" step="0.01" value={target_energy} onChange={handleEnergy} />
                    <input type="range" min="0" max="1" step="0.01" value={target_instrumentalness} onChange={handleInstrumentalness} />
                    <input type="range" min="0" max="1" step="0.01" value={target_loudness} onChange={handleLoudness} />
                    <input type="range" min="0" max="200" step="0.1" value={target_tempo} onChange={handleTempo} />
                    <input type="range" min="0" max="1" step="0.01" value={target_valence} onChange={handleValence} />
                    <button onClick={handleCreatePlaylist}>Create Playlist</button>
            </div>
            <div className="playlist-cards">
            </div>
        </div>
    )
}

export default Main;

/*

*/