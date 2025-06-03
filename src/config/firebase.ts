import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBwqFOjIsn0q2orXCPZ4ORMSJXGbihi8WY",
  authDomain: "student-connect-a6252.firebaseapp.com",
  databaseURL: "https://student-connect-a6252-default-rtdb.firebaseio.com",
  projectId: "student-connect-a6252",
  storageBucket: "student-connect-a6252.firebasestorage.app",
  messagingSenderId: "562968671516",
  appId: "1:562968671516:web:47b78a94edb710aea236d9"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const database = getDatabase(app);