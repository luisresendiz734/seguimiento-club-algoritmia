import PendingList from './PendingList';
import SignIn from './SignIn';
import Logout from './Logout';

const AdminPage = ({ user }) => {
	return (
		<div>
			{user ? (
				<div>
					<Logout />
					<PendingList user={user} />
				</div>
			) : (
				<SignIn />
			)}
		</div>
	);
};

export default AdminPage;
