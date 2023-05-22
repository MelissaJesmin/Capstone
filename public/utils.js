//baseUrl
const baseURL = `http://localhost:4004/songs`;

function authenticateUser() {
    const userId =  sessionStorage.getItem("userId")
    const isAuthenticated = !userId ? false : true
    return isAuthenticated
  }
//callback function for catch
const errCallback = err => console.log(err.response)

function getAllSongs() {
    axios.get(baseURL).then((res) => {
        let songs = res.data
        displayAllSongs(songs)
       // console.log(res)
    })
    .catch(errCallback)
}

const getMoodSongs = (mood) => {
    axios.get(`${baseURL}/${mood}`).then((res) => {
        let songs = res.data
        displayAllSongs(songs)
    })
    .catch(errCallback)
}
const createSong = (body) => {
    axios.post(baseURL,body).then((res) => {
        // songs = res.data
        // displayAllSongs(songs)

        if(res.status === 200) {
            alert(res.data)
            window.location.href='./songs.html'
        }
    })
    .catch(errCallback)
}

const updateLikes = (id,likeCount) => {
    console.log(id,likeCount)
    axios.put(`${baseURL}/${id}?c=${likeCount}`).then((res) => {
        getAllSongs()
    })
    .catch(errCallback)
}

function createSongCard(songs) {
    const songCard = document.createElement('div')
    songCard.classList.add('song-card')
console.log(songs)
    songCard.innerHTML = `
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
    <button id="add-library" onclick = "addToLibrary(${songs})">+</button>
    `
    displaySongs.appendChild(songCard)
}


function displayAllSongs(arr) {
    displaySongs.innerHTML = ''
    for(let i =0; i < arr.length; i++) {
        createSongCard(arr[i])
    }
}

function logoutHandler() {
    sessionStorage.clear()
    // window.location.reload(true) 
    window.location.href='./authLogin.html'
  }


  function addToLibrary(songs) {
    let isAuthenticated = authenticateUser()
    !isAuthenticated ? window.location.href = './authLogin.html' : window.location.href = './library.html'
    const userId =  sessionStorage.getItem("userId")
    axios.post(baseURL,songs).then((res) => {
       let song = res.data
       displayAllSongs(song)
  
      if(res.status === 200) {
          window.location.href='./library.html'
      }
  })
  .catch(errCallback)
  }

  function getLibrary() {
    axios.get(baseURL).then((res) => {
        let songs = res.data
        displayAllSongs(songs)
       // console.log(res)
    })
    .catch(errCallback)
  }

  function displayLogout() {
    if(!authenticateUser) {
        logoutButton.style.display = 'none'
    }
}
