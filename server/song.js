require('dotenv').config()
const express = require("express");
const cors = require("cors");
const {SERVER_PORT} = process.env
const {seed} = require('./db/seed')
const app = express();


app.use(cors());
app.use(express.json());
app.use(express.static('public'))


const { getAllSongs, getMoodSongs, createSong, addToLibrary, updateLikes, getLibrary, deleteSongInLibrary} = require('./controllers/songcontroller')
const { userLogin, userSignup } = require('./controllers/authController')

//dev
app.post('/seed',seed)

//routes
app.get('/songs',getAllSongs)
app.get('/songs/:moods',getMoodSongs)
app.post('/songs',createSong)

//likes
app.put('/songs/:song_id',updateLikes)

//library
app.post('/library',addToLibrary)
app.get('/library/:user_id',getLibrary)
app.delete('/library/:song_id/:user_id', deleteSongInLibrary)


//login and signup endpoints
app.post('/songs/api/login',userLogin)
app.post('/songs/api/signUp',userSignup)


app.listen(SERVER_PORT, () => console.log(`up on ${SERVER_PORT}`))