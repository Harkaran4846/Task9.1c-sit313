import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; 

const firebaseConfig = {
  apiKey: "AIzaSyDdX3VesRe6nHiycl5dNejaQaMB8bNbJr0",
  authDomain: "harakrna-ba036.firebaseapp.com",
  projectId: "harakrna-ba036",
  storageBucket: "harakrna-ba036.appspot.com",
  messagingSenderId: "1085774407681",
  appId: "1:1085774407681:web:e2a99eabefdd0f59efb800"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); 

export { auth, db }; 



