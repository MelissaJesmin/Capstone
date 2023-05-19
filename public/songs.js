const addSongButton = document.querySelector('#addNewSong')
const logoutButton = document.querySelector('#logout')

function addNewSongButton () {
    const userId =  sessionStorage.getItem("userId")
    const isAuthenticated = !userId ? false : true
    !isAuthenticated ? window.location.href = './authLogin.html' : window.location.href = './addsong.html'
  }
  addSongButton.addEventListener('click',addNewSongButton)


logoutButton.addEventListener('click',logoutHandler)


//authButton.addEventListener('click',handleAuth)
//addSongButton.addEventListener('click',addNewSongButton)

// getAllSongs();

