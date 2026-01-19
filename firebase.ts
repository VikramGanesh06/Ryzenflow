
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDCyw0oUI3DsGKLc3g-KnVdQdQ1YURpUDE",
  authDomain: "ryzenflow-8ae55.firebaseapp.com",
  projectId: "ryzenflow-8ae55",
  storageBucket: "ryzenflow-8ae55.firebasestorage.app",
  messagingSenderId: "555238572725",
  appId: "1:555238572725:web:ad3469cb49fab73e3e74fc"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
