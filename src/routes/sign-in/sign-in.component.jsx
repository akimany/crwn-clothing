import { useEffect } from 'react';
import { getRedirectResult } from 'firebase/auth';

import {
  //   auth,
  signInWithGooglePopup,
  //   signInWithGoogleRedirect,
  makeUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils';
import { async } from '@firebase/util';
import SignUpForm from '../../components/sign-up-form/sign-up-form.component';

const SignIn = () => {
  // after it comes back after signInWithGoogleRedirect, on mount - it will run the following
  //   useEffect(() => {
  //     const test = async () => {
  //       const response = await getRedirectResult(auth);
  //       if (response) {
  //         const userDocRef = await makeUserDocumentFromAuth(response.user);
  //       }
  //     };
  //     test();
  //   }, []);

  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await makeUserDocumentFromAuth(user);
  };

  //   const logGoogleRedirectUser = async () => {
  //     const { user } = await signInWithGoogleRedirect();
  //     console.log(user);
  //   };

  return (
    <div>
      <h1>Sign In</h1>
      <button onClick={logGoogleUser}>Sign in with Google popup</button>
      <SignUpForm />
    </div>
  );
};

export default SignIn;
