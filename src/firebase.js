import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage'
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBmUqErW6Axdc2vkkyyKxzR_81UvVwalg4",
    authDomain: "vtube-15.firebaseapp.com",
    projectId: "vtube-15",
    storageBucket: "vtube-15.appspot.com",
    messagingSenderId: "682698938093",
    appId: "1:682698938093:web:8f3b871c860dcf55835ee4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseStorage = getStorage(app);