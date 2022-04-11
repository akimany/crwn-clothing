import { createContext, useState, useEffect } from 'react';
import {
  makeUserDocumentFromAuth,
  onAuthStateChangedListener,
  signOutUser,
} from '../utils/firebase/firebase.utils';

// this is the value that we will want to access
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

// like an alias component that let us use the context
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };

  // this would cause an auth state change, so the the code in useEffect runs:
  // After the stream and listener setup, this is isn't needed
  //   signOutUser();

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        makeUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
