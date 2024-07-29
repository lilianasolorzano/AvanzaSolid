// Import the functions you need from the SDKs you need
import {getAuth} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyAXru_gaJhKryEpfXnUkM6V0yzKa0GuxLE",
  authDomain: "prueba-817f8.firebaseapp.com",
  projectId: "prueba-817f8",
  storageBucket: "prueba-817f8.appspot.com",
  messagingSenderId: "42587712920",
  appId: "1:42587712920:web:d9c640f62658c42bbe8fed",

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// autentificacion de firebase
const auth = getAuth(app);

// exports
// export { app };
export {auth};
export  { db };
