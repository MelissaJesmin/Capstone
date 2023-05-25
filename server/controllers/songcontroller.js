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


module.exports = {
    getAllSongs: (req,res) => {
        sequelize.query(
            `SELECT * from songs
            ORDER BY song_id ASC;`
        ).then((dbRes) => {
            res.status(200).send(dbRes[0])
         })
         .catch(err => console.log(err))
    },
    getMoodSongs: (req,res) => {
        let {moods} = req.params
        console.log(moods)
        sequelize.query(
            `SELECT * from songs WHERE moods = '${moods}';`
        ).then((dbRes) => {
            res.status(200).send(dbRes[0])
         })
         .catch(err => console.log(err))
       
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

    updateLikes : (req,res) => {

        let {song_id} = req.params
        let {c} = req.query

        sequelize.query(`
        UPDATE songs
        SET likes = ${c} 
        WHERE song_id = ${song_id}
        RETURNING *;
        `)
        .then((dbRes) => {res.status(200).send(dbRes[0])})
        .catch(err => console.log(err))
    },

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
    
    getLibrary: (req,res) => {
        let {user_id} = req.params
        sequelize.query(`
        SELECT 
            s.song_id,
            s.thumbnail,
            s.title,
            s.artist,
            s.genre,
            s.url,
            s.moods,
            s.likes,
            u.song_id
            FROM songs s
            JOIN user_songs u
            ON s.song_id = u.song_id
            WHERE u.user_id = ${user_id}
            ORDER BY s.song_id ASC;
    `)
    .then((dbRes) => {res.status(200).send(dbRes[0])})
    .catch(err => console.log(err))
    }
    ,

    deleteSongInLibrary: (req,res) => {
        const {song_id, user_id} = req.params;

        sequelize.query(`
            DELETE FROM user_songs
            WHERE song_id = ${song_id}
            AND user_id = ${user_id}
        `)
        .then((dbRes) => {res.status(200).send(dbRes[0])})
        .catch(err => console.log(err))
    }
}