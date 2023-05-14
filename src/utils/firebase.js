import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD12JVsdmR1IMXdbtW3EXtWxYzgAsD07MI",
  authDomain: "teseo-app-81d77.firebaseapp.com",
  projectId: "teseo-app-81d77",
  storageBucket: "teseo-app-81d77.appspot.com",
  messagingSenderId: "794583488224",
  appId: "1:794583488224:web:f3a6076c904aa1c6352285",
  measurementId: "G-M2CMHVRCN9",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app);
