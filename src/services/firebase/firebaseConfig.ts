import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDN_c1Ltrj60Rvsm8PaWekEtSrOURFt74I",
  authDomain: "myapp-502be.firebaseapp.com",
  projectId: "myapp-502be",
  storageBucket: "myapp-502be.appspot.com",
  messagingSenderId: "426137333879",
  appId: "1:426137333879:web:e01f787895fda14ca89672"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const firestore = getFirestore(app);

export {app, auth}