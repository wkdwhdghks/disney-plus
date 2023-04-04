// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDUWsrhjrAoEfYsTfqOJU_GUxSPmCBi6yc",
  authDomain: "disney-plus-3fc07.firebaseapp.com",
  projectId: "disney-plus-3fc07",
  storageBucket: "disney-plus-3fc07.appspot.com",
  messagingSenderId: "1016028215241",
  appId: "1:1016028215241:web:5625e9eab71a1afd495a18",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
