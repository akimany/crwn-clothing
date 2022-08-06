import SignUpForm from '../../components/sign-up-form/sign-up-form.component';
import SignInForm from '../../components/sign-in-form/sign-in-form.component';

// styles
import { AuthenticationContainer } from './authentication.styles';

const Authentication = () => {
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

  //   const logGoogleRedirectUser = async () => {
  //     const { user } = await signInWithGoogleRedirect();
  //     console.log(user);
  //   };

  return (
    <AuthenticationContainer>
      <SignInForm />
      <SignUpForm />
    </AuthenticationContainer>
  );
};

export default Authentication;
