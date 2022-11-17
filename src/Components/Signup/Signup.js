import React, { useState , useContext } from 'react';
import {useHistory} from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import Logo from '../../olx-logo.png';
import { FirebaseContext } from '../../storage/FirebaseContext';
import './Signup.css';

export default function Signup() {
  const history = useHistory()
  const [username,setUsername] = useState('')
  const [email,setEmail] = useState('')
  const [phone,setPhone] = useState('')
  const [password,setPassword] = useState('')

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

  const handleSubmit = (e) => {
    e.preventDefault()
    try{
    if(username.trim()==='' || username.length < 3){
      handleError('This kind of usernames are not allowed')
    }else if( password.length<6){
      handleError('Password must contain atleast 6 characters!')
    }else if(email.trim()==='' || email.includes('.com')===false || email.includes('@')===false){
      handleError('Enter a valid Email')
    }else if(phone.length!==10){
      handleError('Enter a valid phone number!')
    }
    else{
    console.log('inside the handle submit')
    console.log('inside the try catch block')
    firebase.auth().createUserWithEmailAndPassword(email,password).then((result) => {
      console.log(result,'is the result')
      result.user.updateProfile({displayName:username}).then(() => {
        firebase.firestore().collection('users').add({
          id:result.user.uid,
          username:username,
          phone:phone
        }).then(()=> {
          toast.info('Signing in',toastOptions)
          history.push('/login')
        })
      }).catch((error) => {
        handleError(error.message)
        console.log(error,'is the error')
      })
    }).catch((err) => {
      handleError(err.message)
      console.log(err,'is the err')
    })
  }
   }catch(err){
    console.log(err,'is the error occured in the handleSubmit')
   }
  }
  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            name="name"
            defaultValue="John"
          />
          <br />
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
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            id="lname"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            name="phone"
            defaultValue="Doe"
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
          <button>Signup</button>
        </form>
        <div className="last">
         <p>Already have an account? <span onClick={() => history.push('/login')} >Login</span>  </p> 
        </div>
      </div>
     
    </div>
  );
}
