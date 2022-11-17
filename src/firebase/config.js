import firebase from "firebase";
import 'firebase/auth'
 import 'firebase/firebase'
 import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyDXvY6k_kTjWB3iyZH5vvCq_siMm4LYwQM",
    authDomain: "olx-clone-886df.firebaseapp.com",
    projectId: "olx-clone-886df",
    storageBucket: "olx-clone-886df.appspot.com",
    messagingSenderId: "121200554029",
    appId: "1:121200554029:web:f84b2e9ae35a1b55de48a4"
  };

 export default firebase.initializeApp(firebaseConfig)