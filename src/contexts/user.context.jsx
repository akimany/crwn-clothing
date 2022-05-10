import { createContext, useEffect, useReducer } from 'react';
import { USER_ACTION_TYPES } from '../store/user/user.types';

import {
  makeUserDocumentFromAuth,
  onAuthStateChangedListener,
} from '../utils/firebase/firebase.utils';
import { makeAction } from '../utils/reducer/reducer.utils';

// this is the value that we will want to access
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

const userReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload,
      };

    default:
      throw new Error(`Unhandled type ${type} in userReducer`);
  }
};

const INITIAL_STATE = {
  currentUser: null,
};

// like an alias component that lets us use the context
export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, INITIAL_STATE);
  // destructure off the state
  //  const [{currentUser}, dispatch] = useReducer(userReducer, INITIAL_STATE);
  const { currentUser } = state;

  const setCurrentUser = (user) => {
    dispatch(makeAction(USER_ACTION_TYPES.SET_CURRENT_USER, user));
  };

  const value = { currentUser, setCurrentUser };

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

// Reducers in code: function which return a new object. And because it is a new object,
// they get state - previous one and action and with these two, you can then return the current state.
//You can use the state object to derive the next value. So he said always return an object that spreads through the prievous state.
// use the reducer by using a hook called useReducer, which gives back a state and dispatch. It takes in the reducer and a second argument: the inital state.
// it is calling dispatch which runs the reducer code, like setState. What it gets set to is handled by the action object, which uses 'type' to determine the new state to return.
