import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBmUqErW6Axdc2vkkyyKxzR_81UvVwalg4",
  authDomain: "vtube-15.firebaseapp.com",
  projectId: "vtube-15",
  storageBucket: "vtube-15.appspot.com",
  messagingSenderId: "682698938093",
  appId: "1:682698938093:web:8f3b871c860dcf55835ee4",
  measurementId: "G-8PSHMEKBS6",
};


const app = initializeApp(firebaseConfig);
export const firebaseStorage = getStorage(app);
export const analytics = getAnalytics(app);
