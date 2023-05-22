require('dotenv').config()
const {CONNECTION_STRING} = process.env

const Sequelize = require('sequelize')

const sequelize = new Sequelize(CONNECTION_STRING, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
})

const db = require('../db/sampledb.json')
let id = db.length

module.exports = {
    getAllSongs: (req,res) => {
        sequelize.query(
            `SELECT * from songs;`
        ).then((dbRes) => {
            res.status(200).send(dbRes[0])
         })
         .catch(err => console.log(err))
    },
    getMoodSongs: (req,res) => {
        let {moods} = req.params
        sequelize.query(
            `SELECT * from songs WHERE moods = ${moods};`
        ).then((dbRes) => {
            res.status(200).send(dbRes[0])
         })
         .catch(err => console.log(err))
       
         // let moodSongs = []
        // let {mood} = req.params
        // for (let i = 0; i < db.length; i++) {
        //     if(db[i].songMoods === mood) {
        //          moodSongs.push(db[i])
        //     }
        //   }
        // res.status(200).send(moodSongs)
    },
    createSong : (req,res) => {
        const {thumbnail, title, artist, genre, url, moods, likes} = req.body;

        sequelize.query(
            `
            INSERT INTO songs (thumbnail, title, artist, genre, url, moods, likes)
            VALUES('${thumbnail}', '${title}', '${artist}', '${genre}', '${url}', '${moods}', ${likes})
            RETURNING *;
            `)
            .then((dbRes) => {res.status(200).send('song added successfully')})
            .catch(err => console.log(err))
    }
    ,

    addToLibrary: (req,res) => {
        const {user_id, song_id} = req.body;

        sequelize.query(
            `
            INSERT INTO user_songs (user_id, song_id)
            VALUES(${user_id}, ${song_id})
            RETURNING *;
            `)
            .then((dbRes) => {res.status(200).send('song added to library successfully')})
            .catch(err => console.log(err))
    },

    updateLikes : (req,res) => {

        let {song_id} = req.params
        let {c} = req.query

        sequelize.query(`
        UPDATE songs SET likes = ${c} 
        WHERE song_id = ${song_id}
        RETURNING *;
        `)
        .then((dbRes) => {res.status(200).send(dbRes[0])})
        .catch(err => console.log(err))
    },

    getLibrary: (req,res) => {
        
        sequelize.query(`
        SELECT 
            s.song_id,
            s.title,
            s.artist,
            s.genre,
            s.url,
            s.moods,
            s.likes,
            u.song_id,
            FROM songs s
            JOIN user_songs u
            ON s.song_id = u.song_id
            WHERE u.user_id = 1;
    `)
    .then((dbRes) => {res.status(200).send(dbRes[0])})
    .catch(err => console.log(err))
    }
}