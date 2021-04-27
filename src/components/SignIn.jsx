import React from 'react';
import { auth, googleProvider } from '../utils/firebase';

const SignIn = () => {
	const signInWithGoogle = () => {
		auth.signInWithPopup(googleProvider);
	};

	return <button onClick={signInWithGoogle}>Sign in with Google</button>;
};

export default SignIn;
