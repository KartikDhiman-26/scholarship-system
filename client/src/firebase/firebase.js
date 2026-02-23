// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCbNRgJ_jOU9p1DBODErK18bA84zrMnofE",
  authDomain: "scholarship-system-76eac.firebaseapp.com",
  projectId: "scholarship-system-76eac",
  storageBucket: "scholarship-system-76eac.firebasestorage.app",
  messagingSenderId: "324470285268",
  appId: "1:324470285268:web:41bbbb30fd3684ae78ec41",
  measurementId: "G-PKQYXNLDMN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Correct export
export const auth = getAuth(app);