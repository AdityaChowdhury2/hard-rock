const searchSongs = () => {
    searchText = document.getElementById('search-key').value;
    if (searchText.length > 0) {
        url = `https://api.lyrics.ovh/suggest/${searchText}`
        fetch(url)
            .then(res => res.json())
            .then(songs => {
                // console.log(songs.data);
                displaySongs(songs.data);
            })
    }
}
const displaySongs = (songs) => {
    const songContainer = document.getElementById('songContainer');
    for (let i = 1; i <= 10; i++) {
        const song = songs[i];
        const songDiv = document.createElement('div');
        songDiv.className = 'single-result row align-items-center my-3 p-3';
        songDiv.innerHTML = `
            <div class="col-md-9">
                <div class ='row'>
                    <div class = 'col-md-3'>
                        <img src='${song.album.cover_small}'>
                    </div>
                    <div class = 'col-md-9'>
                        <h3 class="lyrics-name" >${song.title}</h3>
                        <p class="author lead">Album by <span>${song.artist.name}</span></p>
                    </div>
                    <audio controls src="${song.preview}">
                        Your browser does not support the
                        <code>audio</code> element.
                    </audio>
                </div>
            </div>
            <div class="col-md-3 text-md-right text-center">
                <button class="btn btn-success" onclick ="getLyrics('${song.artist.name}','${song.title}')">Get Lyrics</button>
            </div>
        `
        songContainer.appendChild(songDiv);
    }
}
const getLyrics = (artistName, title) => {
    fetch(`https://api.lyrics.ovh/v1/${artistName}/${title}`)
        .then(res => res.json())
        .then(lyrics => {
            if (lyrics.lyrics !== undefined) {
                document.getElementById('single-lyrics').innerText = lyrics.lyrics;
            }
            else {
                displayError('Cannot Get Any Lyrics');
            }
        })
}
const displayError = (error) => {
    const errorMessage = document.getElementById('single-lyrics');
    errorMessage.classList = 'text-danger text-center';
    errorMessage.innerText = error;
}