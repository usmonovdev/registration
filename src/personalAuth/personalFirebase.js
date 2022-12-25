import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyCsR4qoNUpI6Nc33e95cVcDGXnY9YmIoSk",
    authDomain: "auth-project-75011.firebaseapp.com",
    projectId: "auth-project-75011",
    storageBucket: "auth-project-75011.appspot.com",
    messagingSenderId: "350606268029",
    appId: "1:350606268029:web:c022b3cef03310684e4314"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()