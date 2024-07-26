// Import the functions you need from the SDKs you need

// import firebase from "firebase/app";
import {getAuth} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


const firebaseConfig = {
    apiKey: "AIzaSyCxNgOonxMpRqRTEIB2pOkxzfXcpGOmNgc",
    authDomain: "projectavanza-a8cce.firebaseapp.com",
    projectId: "projectavanza-a8cce",
    storageBucket: "projectavanza-a8cce.appspot.com",
    messagingSenderId: "600102410332",
    appId: "1:600102410332:web:67d0d2809b1e930225ee99"
  };
// const firebaseConfig = {
//   apiKey: process.env.VUE_FIREBASE_APIKEY ,
//   authDomain: process.env.VUE_FIREBASE_AUTHDOMAIN ,
//   projectId: process.env.VUE_FIREBASE_PROJECTID ,
//   storageBucket: process.env.VUE_FIREBASE_STORAGEBUCKET ,
//   messagingSenderId: process.env.VUE_FIREBASE_MESSAGINGSENDERID,
//   appId: process.env.VUE_FIREBASE_APPID
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// firebase.initializeApp(firebase)
const db = getFirestore(app)

// autentificacion de firebase 
const auth = getAuth(app);

// exports
export {auth, app};
export default db;




// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getFirestore} from "firebase/firestore";

// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: process.env.VUE_APP_FIREBASE_APIKEY ,
//   authDomain: process.env.VUE_APP_FIREBASE_AUTHDOMAIN ,
//   projectId: process.env.VUE_APP_FIREBASE_PROJECTID ,
//   storageBucket: process.env.VUE_APP_FIREBASE_STORAGEBUCKET ,
//   messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGINGSENDERID,
//   appId: process.env.VUE_APP_FIREBASE_APPID
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app)

// export default db;