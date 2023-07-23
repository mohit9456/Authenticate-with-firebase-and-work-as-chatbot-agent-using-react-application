import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: "chatbot-f6393.firebaseapp.com",
    projectId: "chatbot-f6393",
    storageBucket: "chatbot-f6393.appspot.com",
    messagingSenderId: "875220393912",
    appId: process.env.APP_ID,
}

const app = initializeApp(firebaseConfig)

// firebase.initializeApp(config)

export const auth = getAuth(app);