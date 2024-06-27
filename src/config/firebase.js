// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, initializeFirestore, persistentLocalCache } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCX80e_Bvx0mk4WOtOl1o56J8bnKDMftSA",
  authDomain: "ffms-development.firebaseapp.com",
  projectId: "ffms-development",
  storageBucket: "ffms-development.appspot.com",
  messagingSenderId: "532317794783",
  appId: "1:532317794783:web:68861bb462f0ad369d546a"
};
// const firebaseConfig = {
//   apiKey: "AIzaSyBnaw_vo1Jr1JxP-k5doFyfl5FPIwgJyY4",
//   authDomain: "hems-bea3a.firebaseapp.com",
//   projectId: "hems-bea3a",
//   storageBucket: "hems-bea3a.appspot.com",
//   messagingSenderId: "369349253939",
//   appId: "1:369349253939:web:b65e2b13d6dfb80f193c46"
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
initializeFirestore(app, {localCache: persistentLocalCache(/*settings*/{})});
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);