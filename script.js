document.getElementById('search-lyrics').addEventListener('click', function () {
    const searchText = document.getElementById('search-key').value;
    // console.log(searchText);
    document.querySelector(".search-result").classList.remove('d-none');
    fetch(`https://api.lyrics.ovh/suggest/${searchText}`)
        .then(response => response.json())
        .then(data => {
            const element = data.data[0];
            let lyrics = element.title;
            let artist = element.artist.name;
            document.getElementById('lyrics-name').innerText = lyrics;
            document.getElementById('artist-name').innerText = artist;
            document.getElementById('get-lyrics').addEventListener('click',function(){
                getLyrics(artist,lyrics);
            })
    })
})

function getLyrics(artistName,lyrics){
    fetch(`https://api.lyrics.ovh/v1/${artistName}/${lyrics}`)
    .then(res => res.json())
    .then(lyrics => {
        document.getElementById('single-lyrics').innerText = lyrics.lyrics;
    })
}