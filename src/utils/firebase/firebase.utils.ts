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
  NextOrObserver,
  User,
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
  QueryDocumentSnapshot,
} from 'firebase/firestore';

import { Category } from '../../store/categories/category.types';

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

export type ObjectToAdd = {
  title: string;
};
// Adding collection and documents into firestore
// collectinKey is like 'users'
export const addCollectionAndDocuments = async <T extends ObjectToAdd>(
  collectionKey: string,
  objectsToAdd: T[]
): Promise<void> => {
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

export const getCategoriesAndDocuments = async (): Promise<Category[]> => {
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef);
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(
    (docSnapshot) => docSnapshot.data() as Category
  );
};

// recieves a user authentication object
// Firebase DB side

export type AdditionalInformation = {
  displayName?: string;
};

export type UserData = {
  madeAtDate: Date;
  displayName: string;
  email: string;
};
export const makeUserDocumentFromAuth = async (
  userAuth: User,
  additionalInformation = {} as AdditionalInformation
): Promise<void | QueryDocumentSnapshot<UserData>> => {
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
      console.log('error', error);
    }
  }

  return userSnapshot as QueryDocumentSnapshot<UserData>;
};

// interface
export const makeAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

// interface
export const signInAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback: NextOrObserver<User>) =>
  // callback called whenever the auth state changes
  onAuthStateChanged(auth, callback);

export const getCurrentUser = (): Promise<User | null> => {
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
