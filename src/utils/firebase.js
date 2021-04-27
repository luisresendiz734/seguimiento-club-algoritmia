import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
//import { useCollectionData } from 'react-firebase-hooks/firestore';
//import { useAuthState } from 'react-firebase-hooks/auth';

firebase.initializeApp({
	apiKey: 'AIzaSyBOeXlYs1D7WSVcxDusYBMOhe0IgsVslTk',
	authDomain: 'seguimiento-club-algoritmia.firebaseapp.com',
	projectId: 'seguimiento-club-algoritmia',
	storageBucket: 'seguimiento-club-algoritmia.appspot.com',
	messagingSenderId: '178725882393',
	appId: '1:178725882393:web:8b798e023203368a503888'
});

const auth = firebase.auth();
const firestore = firebase.firestore();

const googleProvider = new firebase.auth.GoogleAuthProvider();

export { auth, firestore, googleProvider };