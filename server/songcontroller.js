const db = require('../server/sampledb.json')
let id = db.length

module.exports = {
    getAllSongs: (req,res) => {
        let allSongs = db
        res.status(200).send(allSongs)
    },

    createSong : (req,res) => {
        id++;
        let newSong = {...req.body,id:id}
        db.push(newSong)

        res.status(200).send('song added successfully');
    }
}