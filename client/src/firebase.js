// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-6bddd.firebaseapp.com",
  projectId: "mern-estate-6bddd",
  storageBucket: "mern-estate-6bddd.firebasestorage.app",
  messagingSenderId: "591445263042",
  appId: "1:591445263042:web:2bb85bb20180419f0bb15b"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);