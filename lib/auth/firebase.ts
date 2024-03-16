// Import the functions you need from the SDKs you need
import { getApps, initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDsotVVC1AKl0PrSWZ_G-KVULI9D-AdaLQ",
    authDomain: "anginat.firebaseapp.com",
    projectId: "anginat",
    storageBucket: "anginat.appspot.com",
    messagingSenderId: "819709228663",
    appId: "1:819709228663:web:8d4dccf6ec1c5bdbd2b872",
    measurementId: "G-G1GL3H7LZL",
};

// Initialize Firebase
const app =
    getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export { app };
