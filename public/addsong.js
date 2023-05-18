const addSongButton = document.querySelector('#addNewSong')

function addNewSongButton () {
    const userId =  sessionStorage.getItem("userId")
    const isAuthenticated = !userId ? false : true
    !isAuthenticated ? window.location.href = './authLogin.html' : window.location.href = './addsong.html'
  }
  addSongButton.addEventListener('click',addNewSongButton)