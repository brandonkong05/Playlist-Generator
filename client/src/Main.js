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

    /*
    CREATE DROPDOWN FROM GENRES ARRAY
    [
    "acoustic",
    "afrobeat",
    "alt-rock",
    "alternative",
    "ambient",
    "anime",
    "black-metal",
    "bluegrass",
    "blues",
    "bossanova",
    "brazil",
    "breakbeat",
    "british",
    "cantopop",
    "chicago-house",
    "children",
    "chill",
    "classical",
    "club",
    "comedy",
    "country",
    "dance",
    "dancehall",
    "death-metal",
    "deep-house",
    "detroit-techno",
    "disco",
    "disney",
    "drum-and-bass",
    "dub",
    "dubstep",
    "edm",
    "electro",
    "electronic",
    "emo",
    "folk",
    "forro",
    "french",
    "funk",
    "garage",
    "german",
    "gospel",
    "goth",
    "grindcore",
    "groove",
    "grunge",
    "guitar",
    "happy",
    "hard-rock",
    "hardcore",
    "hardstyle",
    "heavy-metal",
    "hip-hop",
    "holidays",
    "honky-tonk",
    "house",
    "idm",
    "indian",
    "indie",
    "indie-pop",
    "industrial",
    "iranian",
    "j-dance",
    "j-idol",
    "j-pop",
    "j-rock",
    "jazz",
    "k-pop",
    "kids",
    "latin",
    "latino",
    "malay",
    "mandopop",
    "metal",
    "metal-misc",
    "metalcore",
    "minimal-techno",
    "movies",
    "mpb",
    "new-age",
    "new-release",
    "opera",
    "pagode",
    "party",
    "philippines-opm",
    "piano",
    "pop",
    "pop-film",
    "post-dubstep",
    "power-pop",
    "progressive-house",
    "psych-rock",
    "punk",
    "punk-rock",
    "r-n-b",
    "rainy-day",
    "reggae",
    "reggaeton",
    "road-trip",
    "rock",
    "rock-n-roll",
    "rockabilly",
    "romance",
    "sad",
    "salsa",
    "samba",
    "sertanejo",
    "show-tunes",
    "singer-songwriter",
    "ska",
    "sleep",
    "songwriter",
    "soul",
    "soundtracks",
    "spanish",
    "study",
    "summer",
    "swedish",
    "synth-pop",
    "tango",
    "techno",
    "trance",
    "trip-hop",
    "turkish",
    "work-out",
    "world-music"
  ]
    const handleGenre = (event) => {
        setGenre(event.target.value);
    }

    ADD GENRE DROPDOWN TO DIV
    */
    

    return (
        <div className="main">
            <div className="controls">
                    <input type="text" value={playlistName} onChange={handleName} />
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