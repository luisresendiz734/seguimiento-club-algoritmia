import PendingList from './PendingList';
import SignIn from './SignIn';
import Logout from './Logout';
import Container from './Container';
import React from 'react';

const AdminPage = ({ user }) => {
	return (
		<Container>
			{user ? (
				<React.Fragment>
					<Logout />
					<PendingList user={user} />
				</React.Fragment>
			) : (
				<SignIn />
			)}
		</Container>
	);
};

export default AdminPage;
