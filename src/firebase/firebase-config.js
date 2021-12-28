import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { GoogleAuthProvider } from "firebase/auth";


const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY_FIRE,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN_FIRE,
    projectId: process.env.REACT_APP_PROJECT_ID_FIRE,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET_FIRE,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID_FIRE,
    appId: process.env.REACT_APP_APP_ID_FIRE
};

export const gooleProvider = new GoogleAuthProvider();

export const app = initializeApp(firebaseConfig);

export const db = getFirestore( app );