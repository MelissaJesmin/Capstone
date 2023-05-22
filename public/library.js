document.addEventListener('DOMContentLoaded', () => {
    let isAuthenticated = authenticateUser()
    !isAuthenticated ? window.location.href = './authLogin.html' : window.location.href = './library.html'
    getAllSongs()
})