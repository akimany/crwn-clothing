import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
} from 'firebase/firestore';

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

// Adding collection and documents into firestore
// collectinKey is like 'users'
export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  // if you try to find something in the firebase DB and it isn't there, firebase will make it
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    // don't need db, collectionRef already was supplied it
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });
  await batch.commit();
  console.log('done');
};

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef);
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((docSnapshot) => docSnapshot.data());
};

// recieves a user authentication object
// Firebase DB side
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

  return userSnapshot;
};

// interface
export const makeAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

// interface
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) =>
  // callback called whenever the auth state changes
  onAuthStateChanged(auth, callback);

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (userAuth) => {
        unsubscribe();
        resolve(userAuth);
      },
      reject
    );
  });
};
