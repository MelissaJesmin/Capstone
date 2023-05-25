//select from html
const form = document.querySelector('form')
const songThumbnail = document.querySelector('#songThumbnail')
const songName = document.querySelector('#songName')
const songArtist = document.querySelector('#songArtist')
const songGenre = document.querySelector('#songGenre')
const songURL = document.querySelector('#songURL')
const songMoods = document.querySelector('#songMoods')
const displaySongs = document.querySelector('#displaySongs')




function handleSubmit(e) {
    e.preventDefault()
    let isAuthenticated = authenticateUser()
    !isAuthenticated ? window.location.href = './authLogin.html' : window.location.href = './songs.html'
     //create body object for post
     let body = {
        thumbnail: songThumbnail.value,
        title: songName.value,
        artist: songArtist.value,
        genre: songGenre.value, 
        url: songURL.value,
        moods: songMoods.value,
        likes: 0
    }

    createSong(body)

    songThumbnail.value = ''
    songName.value = ''
    songArtist.value = ''
    songGenre.value = ''
    songURL.value = ''
    songMoods.value = ''

}

form.addEventListener('submit',handleSubmit)