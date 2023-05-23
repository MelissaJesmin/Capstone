require("dotenv").config();
const { CONNECTION_STRING } = process.env;

const Sequelize = require("sequelize");

const sequelize = new Sequelize(CONNECTION_STRING, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

module.exports = {
  seed: (req, res) => {
    sequelize
      .query(
        `
        drop table if exists user_songs;
        drop table if exists user_auth;
        drop table if exists songs;

            create table user_auth(
                user_id serial primary key,
                email varchar not null,
                passhash varchar(500) not null 
            );

            CREATE TABLE songs(
              song_id SERIAL PRIMARY KEY,
              thumbnail VARCHAR(255) NOT NULL,
              title VARCHAR(255) NOT NULL,
              artist  VARCHAR(255) NOT NULL,
              genre VARCHAR(255) NOT NULL,
              url VARCHAR(255) NOT NULL,
              moods VARCHAR(255) NOT NULL,
              likes INTEGER CHECK(likes >= 0)
          );

          CREATE TABLE user_songs(
            user_song_id SERIAL PRIMARY KEY,
            user_id int references user_auth(user_id),
            song_id int references songs(song_id),
            unique (user_id,song_id)
            );

            
INSERT INTO user_auth(email,passhash)
VALUES ('admin@gmail.com','$2a$10$EJ.69pTwtXy/PGj.MQftKe2BguU02kGd0Q2Vr3DuGvQssE18oUCiO'),
('user@gmail.com','$2a$10$Vq0So2z2GLED8vIU7wcymu8ExPP.K0vFD.MgzCIfhYYWMu2NmUjOG');


          INSERT INTO songs (thumbnail, title, artist, genre, url, moods, likes)
VALUES ('https://upload.wikimedia.org/wikipedia/commons/5/5f/BTS_-_Dynamite_%28official_cover%29.png', 'Dynamite', 'BTS','K-Pop','https://www.youtube.com/embed/gdZLi9oWNZg','Happy',300);

        
        
        `
      )
      .then(() => {
        console.log("DB seeded!");
        res.sendStatus(200);
      })
      .catch((err) => console.log("error seeding DB", err));
  },
};
