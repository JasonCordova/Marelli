// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
import { getStorage } from 'firebase/storage';
import image from './M.png';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBbMmSBkOd2UvASGjEn-ywA2gFxgyGYcZ8",
  authDomain: "marelli-ad154.firebaseapp.com",
  projectId: "marelli-ad154",
  storageBucket: "marelli-ad154.appspot.com",
  messagingSenderId: "354297059888",
  appId: "1:354297059888:web:6dcd69ca87aedb5abb6bf5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const defaultProfilePicture = image;