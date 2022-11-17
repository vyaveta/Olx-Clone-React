import React ,{ useContext, useEffect, useState } from 'react';
import './App.css';
import {ToastContainer} from 'react-toastify'
import {BrowserRouter as Router,Route} from 'react-router-dom'
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import ViewPost from './Pages/ViewPost'
import { AuthContext, FirebaseContext } from './storage/FirebaseContext'
import Create from './Pages/Create'
import Post from './storage/PostContext';

/**
 * ?  =====Import Components=====
 */
import Home from './Pages/Home';

function App() {

  const {user,setUser} = useContext(AuthContext)
  const {firebase} = useContext(FirebaseContext)
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setUser(user)
    })
    console.log(user,'is the user')
  })

  return (
    <div>
    <Post>
      <Router>
        <Route exact path='/'>
           <Home />
        </Route>

        <Route path='/signup'>
           <Signup />
        </Route>

        <Route path='/login'>
           <Login />
        </Route>

        <Route path='/create'>
           <Create />
        </Route>

        <Route path='/viewpost'>
           <ViewPost />
        </Route>

      </Router>
      <ToastContainer/>
      </Post>
    </div>
  );
}

export default App;
