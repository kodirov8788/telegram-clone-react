import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyA4HiypFYIdrHj8JtL4pkGmSt03S8LNR6M",
    authDomain: "telegram-react-9dfc0.firebaseapp.com",
    projectId: "telegram-react-9dfc0",
    storageBucket: "telegram-react-9dfc0.appspot.com",
    messagingSenderId: "207549723669",
    appId: "1:207549723669:web:bc64c5a1cba6a2d9744a1c"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore()
export const auth = getAuth()