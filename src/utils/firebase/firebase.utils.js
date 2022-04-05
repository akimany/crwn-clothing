import { async } from '@firebase/util';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
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
const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: 'select_account',
});

// singleton, so no 'new' needed
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

// firestore
// singleton instance
export const db = getFirestore();

// recieves a user authentication object
export const makeUserDocumentFromAuth = async (userAuth) => {
  console.log(userAuth);
  // takes a unique ID
  const userDocRef = doc(db, 'users', userAuth.uid);
  console.log(userDocRef);
  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot.exists());

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const madeAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        madeAt,
      });
    } catch (error) {
      console.log('error', error.message);
    }
  }

  return userDocRef;

  // if user data exists
  // return userDocRef

  // if usr data is not there
  // make/set docuement using the userSnapshot
};
