// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: "slumbershift-87b2d.firebaseapp.com",
  projectId: "slumbershift-87b2d",
  storageBucket: "slumbershift-87b2d.appspot.com",
  messagingSenderId: "296734269123",
  appId: "1:296734269123:web:e6c7672202927425c84c76"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);