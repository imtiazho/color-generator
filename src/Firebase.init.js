import { getAuth } from "firebase/auth";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBCa4rCbfkkryv7Fq9S60rOUrtCEE52uLk",
    authDomain: "color-generator-huzur-mama.firebaseapp.com",
    projectId: "color-generator-huzur-mama",
    storageBucket: "color-generator-huzur-mama.appspot.com",
    messagingSenderId: "1056879039773",
    appId: "1:1056879039773:web:f613156cb53c2c21603df4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;