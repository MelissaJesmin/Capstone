//baseUrl
const baseURL = `http://localhost:4004/songs`;

//callback function for catch
const errCallback = err => console.log(err.response)

function getAllSongs() {
    axios.get(baseURL).then((res) => {
        let songs = res.data
        displayAllSongs(songs)
       // console.log(res)
    })
    .catch(errCallback)
}

const getMoodSongs = (mood) => {
    axios.get(`${baseURL}/${mood}`).then((res) => {
        let songs = res.data
        displayAllSongs(songs)
    })
    .catch(errCallback)
}
const createSong = (body) => {
    axios.post(baseURL,body).then((res) => {
        // songs = res.data
        // displayAllSongs(songs)

        if(res.status === 200) {
            alert(res.data)
            window.location.href='./songs.html'
        }
    })
    .catch(errCallback)
}


function createSongCard(songs) {
    const songCard = document.createElement('div')
    songCard.classList.add('song-card')
console.log(songs)
    songCard.innerHTML = `
    <p class="song-name"> Name: ${songs.songName}</p>
    <p class="song-artist">Artist: ${songs.songArtist}</p>
    <p class="song-genre"> Genre: ${songs.songGenre}</p>
    <a href = ${songs.songURL} class="song-url"> URL:Click Me</a>
    <p class="song-mood"> Mood: ${songs.songMoods}</p>
    `
    displaySongs.appendChild(songCard)
}


function displayAllSongs(arr) {
    displaySongs.innerHTML = ''
    for(let i =0; i < arr.length; i++) {
        createSongCard(arr[i])
    }
}