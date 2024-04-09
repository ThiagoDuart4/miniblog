
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
const firebaseConfig = {
  apiKey: "AIzaSyDNDDIcjHM-yPffinPJrYo-LjyrypcaehY",
  authDomain: "mini-blog-315eb.firebaseapp.com",
  projectId: "mini-blog-315eb",
  storageBucket: "mini-blog-315eb.appspot.com",
  messagingSenderId: "322645122850",
  appId: "1:322645122850:web:aa20020da0b4d498690f7b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db =  getFirestore(app)

export {db}