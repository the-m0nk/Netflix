// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyC6k2p9ZLynuzBt9fe2PgbJJSmiHZ7YZ1s",
  authDomain: "netflix-clone-65e4f.firebaseapp.com",
  projectId: "netflix-clone-65e4f",
  storageBucket: "netflix-clone-65e4f.appspot.com",
  messagingSenderId: "383682625089",
  appId: "1:383682625089:web:b6c854ae0c735f34ce50c0",
  measurementId: "G-26H4X5EMYJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);