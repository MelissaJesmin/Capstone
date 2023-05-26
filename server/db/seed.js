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
VALUES ('https://upload.wikimedia.org/wikipedia/commons/5/5f/BTS_-_Dynamite_%28official_cover%29.png', 'Dynamite', 'BTS','Disco Pop','https://www.youtube.com/watch?v=gdZLi9oWNZg&ab_channel=HYBELABELS','Happy',810),
('https://i.ytimg.com/vi/3oLJpRJjGkY/maxresdefault.jpg', 'Comforting Night', 'BigRicePiano','New-Age Music','https://www.youtube.com/watch?v=3oLJpRJjGkY&ab_channel=BigRicePiano','Relaxed',605),
('https://m.media-amazon.com/images/M/MV5BN2ZkYzkzYmUtNzFjOC00YTRmLWIwYjEtMWZiYjI4Mzg4ZTJjXkEyXkFqcGdeQXVyNjk5NzY4OTk@._V1_.jpg', 'Spring Day', 'BTS','Pop Rock','https://www.youtube.com/watch?v=xEeFrLSkMm8&ab_channel=HYBELABELS','Sad',505),
('https://upload.wikimedia.org/wikipedia/en/5/5a/Silhouette_by_Kana-Boon.jpg', 'Silhouette', 'Kana-Boon','Japanese Rock','https://www.youtube.com/watch?v=dlFA0Zq1k2A&ab_channel=KANABOONVEVO','Motivated', 1050),
('https://cdn.shopify.com/s/files/1/2604/0086/products/Always.jpg?v=1588667569', 'Always', 'Peder B. Helland','New-Age Music','https://www.youtube.com/watch?v=tSc8WROtNfc&ab_channel=PederB.Helland','Relaxed',706),
('https://i.scdn.co/image/ab67616d0000b273cbbbea7d8fcf057f65071a85', 'Nandemonaiya', 'RADWIMPS','Japanese Rock','https://www.youtube.com/watch?v=n89SKAymNfA&ab_channel=RADWIMPS-Topic','Sad',959),
('https://images.genius.com/bd029b1dd18556aed8c4c5e9e1dec074.300x300x1.png', 'Euphoria', 'Jungkook','Pop music','https://www.youtube.com/watch?v=5BdSZkY6F4M&ab_channel=jungkook%27sclub','Happy',1800),
('https://images.genius.com/17ec7a755c21bdc7370645f5766d5513.820x820x1.jpg', 'Paradise', 'BTS','Pop Music','https://www.youtube.com/watch?v=obH7iPDAn2Q&ab_channel=BTS-Topic','Motivated',760),
('https://thebiaslistcom.files.wordpress.com/2023/04/agust-d-bts-suga-people-pt.2-ft.-iu.jpg', 'People Pt.2', 'Suga','Hip-Hop','https://www.youtube.com/watch?v=uVD-YgzDzyY&ab_channel=HYBELABELS','Sad',1600),
('https://i1.sndcdn.com/artworks-BtOzNBnJYfiZ-0-t500x500.jpg', 'Poem of the Clouds', 'BigRicePiano','New-Age Music','https://www.youtube.com/watch?v=n8J-Cp1bPgc&ab_channel=BigRicePiano','Relaxed', 920),
('https://i.ytimg.com/vi/LmApDbvNCXg/maxresdefault.jpg', 'Ego', 'J-Hope','Hip-Hop','https://www.youtube.com/watch?v=LmApDbvNCXg&ab_channel=HYBELABELS','Happy', 990),
('https://images.genius.com/73936eb7a2c5b21efdb969e763cf14eb.1000x1000x1.png', 'Wild Flower', 'RM','Hip-Hop/Rap','https://www.youtube.com/watch?v=u18be_kRmC0&ab_channel=HYBELABELS','Motivated',1500);


        
        
        `
      )
      .then(() => {
        console.log("DB seeded!");
        res.sendStatus(200);
      })
      .catch((err) => console.log("error seeding DB", err));
  },
};
