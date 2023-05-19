const libraryButton = document.querySelector('#library')

function addToLibraryButton () {
    const userId =  sessionStorage.getItem("userId")
    const isAuthenticated = !userId ? false : true
    !isAuthenticated ? window.location.href = './authLogin.html' : window.location.href = './library.html'
  }
  libraryButton.addEventListener('click',addToLibraryButton)

  // function addToLibrary(songs) {
  //   axios.post(baseURL,songs).then((res) => {
  //     // songs = res.data
  //     // displayAllSongs(songs)
  
  //     if(res.status === 200) {
  //         alert(res.data)
  //         window.location.href='./library.html'
  //     }
  // })
  // .catch(errCallback)
  // }
  // libraryButton.addEventListener('click',addToLibrary)
