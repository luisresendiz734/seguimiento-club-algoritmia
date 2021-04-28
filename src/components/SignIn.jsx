import { Button } from '@material-ui/core';
import React from 'react';
import { auth, googleProvider } from '../utils/firebase';

const SignIn = () => {
	const signInWithGoogle = () => {
		auth.signInWithPopup(googleProvider);
	};

	return (
		<Button variant="contained" color="secondary" onClick={signInWithGoogle}>
			Sign in with Google
		</Button>
	);
};

export default SignIn;
