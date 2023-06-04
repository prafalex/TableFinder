import { initializeApp } from 'firebase/app';
import { getStorage } from "firebase/storage";


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

const storage = getStorage(app);

export {app,storage};
