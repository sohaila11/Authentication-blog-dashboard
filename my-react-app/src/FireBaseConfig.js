import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBT6XalJCRe_4ti2NtTBop6qlng4b5rLKI",
  authDomain: "authenticated-blog-dashboard.firebaseapp.com",
  projectId: "authenticated-blog-dashboard",
  storageBucket: "authenticated-blog-dashboard.firebasestorage.app",
  messagingSenderId: "85869827268",
  appId: "1:85869827268:web:2b26537636e7a6fc9de591"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
