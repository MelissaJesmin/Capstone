const baseURL = `http://localhost:4004/songs`;

const authButton = document.querySelector('#authSubmit')
const login = (body) =>
  axios
    .post(`${baseURL}/api/login`, body)
    .then((res) => {
      console.log(res.data);
      sessionStorage.setItem("userId", res.data.song_user_id);
      window.location.href='./songs.html';
    })
    .catch(errCallback)

const signUp = (body) => {
  console.log(body)
    axios
    .post(`${baseURL}/api/signUp`, body)
    .then(async (res) => {
       console.log("hit signup");
   
      sessionStorage.setItem("userId", res.data.song_user_id);
      window.location.href='./authLogin.html';
    })
    .catch(errCallback)
  }

    
const handleAuth = (authType) => {
      let email = document.querySelector(`#${authType}_email`)
      let password = document.querySelector(`#${authType}_password`)
      console.log(email.value, password.value)
      authType === "signup" ? signUp({email:email.value,password:password.value}) : login({email:email.value,password:password.value});
    };


authButton.addEventListener('click',handleAuth)