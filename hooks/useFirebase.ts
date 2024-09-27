import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDUXo4Q_tZgdeFwK_5a22SDXsPZOM5QxVs",
  authDomain: "shisho-mbmc.firebaseapp.com",
  projectId: "shisho-mbmc",
  storageBucket: "shisho-mbmc.appspot.com",
  messagingSenderId: "344718104381",
  appId: "1:344718104381:web:b8d43ffbef08a7d712d754",
  measurementId: "G-XZJ3SCRWD6"
};

const app = initializeApp(firebaseConfig);

export { app };