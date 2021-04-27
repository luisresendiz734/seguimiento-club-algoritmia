import PendingList from './PendingList';
import { auth } from '../utils/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import SignIn from './SignIn';

const AdminPage = () => {
	const [ user ] = useAuthState(auth);
	return <div>{user ? <PendingList admin={true} /> : <SignIn />}</div>;
};

export default AdminPage;
