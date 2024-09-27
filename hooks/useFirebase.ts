import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyABoXvox37cU6eakRn9Spba3mGtU-m5Xj8",
  authDomain: "shishu-bb544.firebaseapp.com",
  projectId: "shishu-bb544",
  storageBucket: "shishu-bb544.appspot.com",
  messagingSenderId: "244198027958",
  appId: "1:244198027958:web:3e3a6b623edfc334376c17",
  measurementId: "G-TR2X2JZDVP"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const store = getFirestore(app);

export { app, auth, store };