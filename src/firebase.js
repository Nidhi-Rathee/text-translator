import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore'

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: "translator-3ca93.firebaseapp.com",
    databaseURL: "https://translator-3ca93-default-rtdb.firebaseio.com",
    projectId: "translator-3ca93",
    storageBucket: "translator-3ca93.appspot.com",
    messagingSenderId: "821960938341",
    appId: "1:821960938341:web:d790cd427d6c3c4235c78c",
    measurementId: "G-5ECBD37NPN"
};

//initialize firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)