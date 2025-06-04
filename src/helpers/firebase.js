import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { initializeApp } from "firebase/app";
import { getEvn } from "./getEnv";

const firebaseConfig = {
    apiKey: getEvn('VITE_FIREBASE_API'),
    authDomain: "count-d740c.firebaseapp.com",
    projectId: "count-d740c",
    storageBucket: "count-d740c.firebasestorage.app",
    messagingSenderId: "271477235848",
    appId: "1:271477235848=web:3c9ba32a44230a2a32bf3d",
    measurementId:'G-REG7RNLY3D'
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export { auth, provider }
