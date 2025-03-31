// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDdpgQ5ZlAEz9A4N4q3dkow00BPp_qIQ9o",
  authDomain: "notion-clone-ai-85940.firebaseapp.com",
  projectId: "notion-clone-ai-85940",
  storageBucket: "notion-clone-ai-85940.firebasestorage.app",
  messagingSenderId: "322504833330",
  appId: "1:322504833330:web:804ae71caaf76f58a3ff2b"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore(app);

export {db};