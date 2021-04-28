import { Button } from '@material-ui/core';
import { auth } from '../utils/firebase';

const Logout = () => {
	const handleLogout = () => {
		auth.signOut();
	};
	return (
		<Button variant="contained" color="primary" onClick={handleLogout}>
			Logout
		</Button>
	);
};

export default Logout;
