import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDrdSPE_JAbModRCp85p3tvMjZgzWMAhU0",
    authDomain: "codenames-2020.firebaseapp.com",
    databaseURL: "https://codenames-2020.firebaseio.com",
    projectId: "codenames-2020",
    storageBucket: "codenames-2020.appspot.com",
    messagingSenderId: "726434951114",
    appId: "1:726434951114:web:2766d17322c9ab77a1a933",
    measurementId: "G-9Z7FEWMLK5"
};
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export function docToObject(doc) {
    return {
        id: doc.id,
        ...doc.data(),
    };
}
