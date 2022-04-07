import { async } from '@firebase/util';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyByUf74YUpYkxDnZzi_6uBudq8p3jrfp90',
  authDomain: 'crwn-clothing-db-e99b4.firebaseapp.com',
  projectId: 'crwn-clothing-db-e99b4',
  storageBucket: 'crwn-clothing-db-e99b4.appspot.com',
  messagingSenderId: '375819372391',
  appId: '1:375819372391:web:007b29d35d49a27a25d1c2',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Set up authentication - class, hence 'new'
const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: 'select_account',
});

// singleton, so no 'new' needed
export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

// firestore
// singleton instance
export const db = getFirestore();

// recieves a user authentication object
export const makeUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;
  // takes a unique ID from a sign service - signInWithPopup/signInWithRedirect
  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  // if user data is not there
  // make/set document using the userSnapshot
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const madeAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        madeAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log('error', error.message);
    }
  }

  // if user data exists
  // return userDocRef
  return userDocRef;
};

export const makeAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};
