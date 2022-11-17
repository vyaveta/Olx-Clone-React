import React, { useState , useContext } from 'react';
import { FirebaseContext } from '../../storage/FirebaseContext'
import {useHistory} from 'react-router-dom';
import { toast } from 'react-toastify';
import Logo from '../../olx-logo.png';
import './Login.css';

function Login() {
  const history = useHistory()
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState("")

  const { firebase } = useContext(FirebaseContext)
 
  const toastOptions =  {
    position: "bottom-left",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    }
    const handleError = (msg) => {
      toast.error(msg,toastOptions)
    }

  const handleLogin = (e) => {
    try{
      e.preventDefault()
      firebase.auth().signInWithEmailAndPassword(email,password).then(() => {
        toast.info('Succesfully logged into your account!',toastOptions)
        history.push('/')
      }).catch((err) => {
        handleError(err.message)
      })
    }catch(err){
      console.log(err,'is the error that occured in the login.js component')
    }
  }

  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleLogin} >
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            defaultValue="Doe"
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        <span onClick={(e) => history.push('/signup')} >Signup</span>
      </div>
    </div>
  );
}

export default Login;
