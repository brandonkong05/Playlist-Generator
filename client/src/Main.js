import React from 'react';

function Main({ token, playlistName, setPlaylistName, genre, setGenre, target_acousticness, setAcousticness, target_danceability, setDanceability, target_energy, setEnergy, target_instrumentalness, setInstrumentalness, target_loudness, setLoudness, target_tempo, setTempo, target_valence, setValence, handleCreatePlaylist }) {
    return (
        <div className="main">
          <div className="controls">
            <label>
              Playlist Name:
            <input type="text" value={playlistName} onChange={(e) => setPlaylistName(e.target.value)} />
            </label>
            <label>
              Genre:
              <input type="text" value={genre} onChange={(e) => setGenre(e.target.value)} />
            </label>
            <label>
              Acousticness:
              <input type="range" min="0" max="1" step="0.01" value={target_acousticness} onChange={(e) => setAcousticness(e.target.value)} />
            </label>
            <label>
              Danceability:
              <input type="range" min="0" max="1" step="0.01" value={target_danceability} onChange={(e) => setDanceability(e.target.value)} />
            </label>
            <label>
              Energy:
              <input type="range" min="0" max="1" step="0.01" value={target_energy} onChange={(e) => setEnergy(e.target.value)} />
            </label>
            <label>
              Instrumentalness:
              <input type="range" min="0" max="1" step="0.01" value={target_instrumentalness} onChange={(e) => setInstrumentalness(e.target.value)} />
            </label>
            <label>
              Loudness:
              <input type="range" min="0" max="1" step="0.01" value={target_loudness} onChange={(e) => setLoudness(e.target.value)} />
            </label>
            <label>
              Tempo:
              <input type="range" min="0" max="200" step="0.1" value={target_tempo} onChange={(e) => setTempo(e.target.value)} />
            </label>
            <label>
              Valence:
              <input type="range" min="0" max="1" step="0.01" value={target_valence} onChange={(e) => setValence(e.target.value)} />
            </label>
            <button onClick={handleCreatePlaylist}>Create Playlist</button>
          </div>
          <div className="playlist-cards">
          </div>
        </div>
      );
    }

export default Main;

/*

*/
