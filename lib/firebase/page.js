// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBmvp9LQPrw9BIOTVKxY7eHXTqJp_2Vog8",
    authDomain: "ateliers-a60ae.firebaseapp.com",
    projectId: "ateliers-a60ae",
    storageBucket: "ateliers-a60ae.appspot.com",
    messagingSenderId: "933227150825",
    appId: "1:933227150825:web:e01fb77c24f47d5c6cdf78"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export { app };