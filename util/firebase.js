import { initializeApp } from 'firebase/app';

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAY9Y2wYuCXRC52CcxrQ5c7gWJX7XSqI68",
    authDomain: "tablefinder-c5b4a.firebaseapp.com",
    databaseURL: "https://tablefinder-c5b4a-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "tablefinder-c5b4a",
    storageBucket: "tablefinder-c5b4a.appspot.com",
    messagingSenderId: "811902375241",
    appId: "1:811902375241:web:417bd88453ff4ec6e13698"
  };

const app = initializeApp(firebaseConfig);

export default app;