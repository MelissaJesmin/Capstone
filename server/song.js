require('dotenv').config()
const express = require("express");
const cors = require("cors");
const {SERVER_PORT} = process.env
const {seed} = require('./db/seed')
const app = express();
const path = require('path')

app.use(cors());
app.use(express.json());
app.use(express.static('public'))


const { getAllSongs, getMoodSongs, createSong, addToLibrary, updateLikes, getLibrary} = require('./controllers/songcontroller')
const { userLogin, userSignup } = require('./controllers/authController')
//dev
app.post('/seed',seed)
//routes
app.get('/songs',getAllSongs)
app.get('/songs/:moods',getMoodSongs)
app.post('/songs',createSong)
app.post('/songs',addToLibrary)
app.put('/songs/:song_id',updateLikes)
app.get('/songs',getLibrary)

//login and signup endpoints
app.post('/songs/api/login',userLogin)
app.post('/songs/api/signUp',userSignup)

app.get('/')

app.listen(SERVER_PORT, () => console.log(`up on ${SERVER_PORT}`))