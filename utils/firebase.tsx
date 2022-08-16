import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDdIWbGg5pNv905bpY-gsvzI4hWYwMFZBk",
  authDomain: "neetlist-dc970.firebaseapp.com",
  projectId: "neetlist-dc970",
  storageBucket: "neetlist-dc970.appspot.com",
  messagingSenderId: "492360632946",
  appId: "1:492360632946:web:b9f70c166d0f1b6365d0eb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
