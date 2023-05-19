//select from html
const form = document.querySelector('form')
const songName = document.querySelector('#songName')
const songArtist = document.querySelector('#songArtist')
const songGenre = document.querySelector('#songGenre')
const songURL = document.querySelector('#songURL')
const songMoods = document.querySelector('#songMoods')
const displaySongs = document.querySelector('#displaySongs')
// const authButton = document.querySelector('#authSubmit')


function handleSubmit(e) {
    e.preventDefault()

     //create body object for post
     let body = {
        songName: songName.value,
        songArtist: songArtist.value,
        songGenre: songGenre.value, 
        songURL: songURL.value,
        songMoods: songMoods.value
    }

    createSong(body)

    songName.value = ''
    songArtist.value = ''
    songGenre.value = ''
    songURL.value = ''
    songMoods.value = ''

}

form.addEventListener('submit',handleSubmit)