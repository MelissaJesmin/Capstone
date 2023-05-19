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
        let allSongs = db
        res.status(200).send(allSongs)
    },
    getMoodSongs: (req,res) => {
        let moodSongs = []
        let {mood} = req.params
        for (let i = 0; i < db.length; i++) {
            if(db[i].songMoods === mood) {
                 moodSongs.push(db[i])
            }
          }
        res.status(200).send(moodSongs)
    },
    createSong : (req,res) => {
        id++;
        let newSong = {...req.body,id:id}
        db.push(newSong)

        res.status(200).send('song added successfully');
    }
    // ,

    // addToLibrary: (req,res) => {
    //     id++;
    //     let newSong = {...req.body}
    //     // db.push(newSong)

    //     res.status(200).send(newSong);
    // }
}