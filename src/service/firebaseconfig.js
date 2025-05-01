// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAp7Ynl7Nay67pG170hndgdcvdMVLkinrY",
  authDomain: "ai-trip-planner-fe842.firebaseapp.com",
  projectId: "ai-trip-planner-fe842",
  storageBucket: "ai-trip-planner-fe842.firebasestorage.app",
  messagingSenderId: "845984540919",
  appId: "1:845984540919:web:1311c8e35d4b950b8b4bf2",
  measurementId: "G-K6GD8K3PZR"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db= getFirestore(app);
//const analytics = getAnalytics(app);