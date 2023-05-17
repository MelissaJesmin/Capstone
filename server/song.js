require('dotenv').config()
const express = require("express");
const cors = require("cors");
const {SERVER_PORT} = process.env
const {seed} = require('./seed.js')
const app = express();

app.use(cors());

app.use(express.json());

const { getAllSongs, getMoodSongs, createSong} = require('./songcontroller')

//dev
app.post('/seed',seed)
//routes
app.get('/songs',getAllSongs)
app.get('/songs/:mood',getMoodSongs)
app.post('/songs',createSong)





app.listen(SERVER_PORT, () => console.log(`up on ${SERVER_PORT}`))