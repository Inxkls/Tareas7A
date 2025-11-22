// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCGkfETXiY_a_Xa1R8PfBlSPyapn6vYq-w",
  authDomain: "fir-authapp-4fca6.firebaseapp.com",
  projectId: "fir-authapp-4fca6",
  storageBucket: "fir-authapp-4fca6.firebasestorage.app",
  messagingSenderId: "359607850075",
  appId: "1:359607850075:web:7cc4f7d4de3864806b9b7e",
  measurementId: "G-VWL6JLZRKX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);