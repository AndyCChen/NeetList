import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDdIWbGg5pNv905bpY-gsvzI4hWYwMFZBk",
  authDomain: "neetlist-dc970.firebaseapp.com",
  projectId: "neetlist-dc970",
  storageBucket: "neetlist-dc970.appspot.com",
  messagingSenderId: "492360632946",
  appId: "1:492360632946:web:7e9db2525991017c65d0eb"
};

// Initialize Firebase
const initFirebase = () => {
  const app = initializeApp(firebaseConfig);
}

export { initFirebase };
