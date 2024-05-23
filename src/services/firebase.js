import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBFZBHTBTNilJSlj9bdhBWE39AoOBTxrss",
  authDomain: "jera-webapi.firebaseapp.com",
  projectId: "jera-webapi",
  storageBucket: "jera-webapi.appspot.com",
  messagingSenderId: "448360478278",
  appId: "1:448360478278:web:57ebed163a0827c25bfc47",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
export { firebaseApp, auth, db };
