import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { initFirebase } from './firebase'

// initialize firebase before instancing auth
initFirebase();
const auth = getAuth();

const createUser = (email: string, password: string) => {
   createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
         console.log('sign up success!');
      })
      .catch((error) => {
         console.log(error.message);
      });
}

const signInUser = (email: string, password: string) => {
   signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
         console.log('log in success!');
      })
      .catch((error) => {
         console.log(error.message);
      });
}

export { createUser, signInUser };