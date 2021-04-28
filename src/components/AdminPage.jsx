import PendingList from './PendingList';
import SignIn from './SignIn';
import Logout from './Logout';
import Container from './Container';

const AdminPage = ({ user }) => {
	return (
		<Container>
			{user ? (
				<div>
					<Logout />
					<PendingList user={user} />
				</div>
			) : (
				<SignIn />
			)}
		</Container>
	);
};

export default AdminPage;
