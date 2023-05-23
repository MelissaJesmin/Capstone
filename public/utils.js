//baseUrl
const baseURL = `http://localhost:4004`;


//authentication
function authenticateUser() {
    const userId =  sessionStorage.getItem("userId")
    const isAuthenticated = !userId ? false : true
    return isAuthenticated
  }


  //callback function for catch
const errCallback = err => console.log(err)



//get all songs for song.html
function getAllSongs() {
    axios.get(`${baseURL}/songs`).then((res) => {
        let songs = res.data
        displayAllSongs(songs)
       // console.log(res)
    })
    .catch(errCallback)
}

//get songs related to the mood for mood.html
const getMoodSongs = (mood) => {
    axios.get(`${baseURL}/songs/${mood}`).then((res) => {
        let songs = res.data
        displayAllSongs(songs)
    })
    .catch(errCallback)
}

//post songs into the database after user creates it using the form in addsong.html
const createSong = (body) => {
    axios.post(`${baseURL}/songs`,body).then((res) => {

        if(res.status === 200) {
            alert(res.data)
            window.location.href='./songs.html'
        }
    })
    .catch(errCallback)
}

//update the likes of the song 
const updateLikes = (id,likeCount) => {
    console.log(id,likeCount)
    axios.put(`${baseURL}/songs/${id}?c=${likeCount}`).then((res) => {
        getAllSongs()
    })
    .catch(errCallback)
}


//display functions for song.html:

function createSongCard(songs) {
    const songCard = document.createElement('div')
    songCard.classList.add('song-card')
console.log(songs)
    songCard.innerHTML = `
    <div class="card" style="width: 18rem;">
    <div>
    <img src= ${songs.thumbnail} class="card-img-top" >
    </div>
    <div class="card-body">
    <h5 class="card-title" class="song-name"> Name: ${songs.title}</h5>
    </div>
    <p class="list-group-item" class="song-artist">Artist: ${songs.artist}</p>
    <p class="list-group-item" class="song-genre"> Genre: ${songs.genre}</p>
    <p class="list-group-item" class="song-mood"> Mood: ${songs.moods}</p>
    <a href = ${songs.url} class="list-group-item" class="card-link" class="song-url"> Youtube Link</a>
    <button onclick="updateLikes(${songs.song_id}, ${songs.likes-1})">&#128078;</button>
        <p class="song-likes"> ${songs.likes}</p>
        <button onclick="updateLikes(${songs.song_id}, ${songs.likes+1})">&#128077;</button>
    <button class="btn btn-primary" id="add-library" onclick = "addToLibrary(${songs.song_id})">+</button>
    </div>
    `
    displaySongs.appendChild(songCard)
}


function displayAllSongs(arr) {
    displaySongs.innerHTML = ''
    for(let i =0; i < arr.length; i++) {
        createSongCard(arr[i])
    }
}


const userId =  sessionStorage.getItem("userId")
//Library functions:

  function addToLibrary(songId) {
    // let isAuthenticated = authenticateUser()
    // !isAuthenticated ? window.location.href = './authLogin.html' : window.location.href = './library.html'
    
    let body = {
        user_id : userId,
        song_id: songId
    }
  
    axios.post(`${baseURL}/library`,body).then((res) => {
    
       if(res.status === 200) {
        alert(res.data)
       }
  })
  .catch(errCallback)
  }

  function getLibrary() {
    axios.get(`${baseURL}/library/${userId}`).then((res) => {
        let songs = res.data
        displayLibrarySongs(songs)
       // console.log(res)
    })
    .catch(errCallback)
  }

  function deleteSongInLibrary(song_id) {
    axios.delete(`${baseURL}/library/${song_id}/${userId}`)
        .then(() => getLibrary())
        .catch(err => console.log(err))
}



//display functions for library.html: 

  function displayLibrarySongs(arr) {
    displayLibrary.innerHTML = ''
    for(let i = 0; i < arr.length; i++) {
        createLibraryCard(arr[i])
    }
}

function createLibraryCard(songs) {
    const LibraryCard = document.createElement('div')
    LibraryCard.classList.add('library-card')
console.log(songs)
    LibraryCard.innerHTML = `
    <div>
    <img src= ${songs.thumbnail} >
    <iframe width="560" height="315" src="${songs.url}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
    </div>
    <p class="song-name"> Name: ${songs.title}</p>
    <p class="song-artist">Artist: ${songs.artist}</p>
    <p class="song-genre"> Genre: ${songs.genre}</p>
    <a href = ${songs.url} class="song-url"> URL:Click Me</a>
    <p class="song-mood"> Mood: ${songs.moods}</p>
    <button onclick="updateLikes(${songs.song_id}, ${songs.likes-1})">&#128078;</button>
        <p class="song-likes"> ${songs.likes}</p>
        <button onclick="updateLikes(${songs.song_id}, ${songs.likes+1})">&#128077;</button>
        <button onclick="deleteSongInLibrary(${songs.song_id})">Delete</button>
    `
    displayLibrary.appendChild(LibraryCard)
}



//Login and Logout functions:

  function logoutHandler() {
    sessionStorage.clear()
    // window.location.reload(true) 
    window.location.href='./authLogin.html'
  }

  function loginHandler() {
    window.location.href='./authLogin.html'
  }

  function displayLogout() {
    let authenticate = authenticateUser()
    if(!authenticate) {
        logoutButton.style.display = 'none'
    }
}

function displayLogin() {
    let authenticate = authenticateUser()
    if(authenticate) {
        loginButton.style.display = 'none'
    }
}

