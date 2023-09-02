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

// const firebaseConfig = {
//   apiKey: "AIzaSyAnI4AkUZQvTbE6012n9Uw02rqQ41otjAw",
//   authDomain: "teseo-contract-mining.firebaseapp.com",
//   projectId: "teseo-contract-mining",
//   storageBucket: "teseo-contract-mining.appspot.com",
//   messagingSenderId: "188698485308",
//   appId: "1:188698485308:web:a962b1b2e770f87a8cd939",
// };

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app);
