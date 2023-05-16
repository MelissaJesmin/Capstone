const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

const { getAllSongs, createSong} = require('./songcontroller')


//routes
app.get('/songs',getAllSongs)
app.post('/songs',createSong)





app.listen(4004, () => console.log("Server running on 4004"));