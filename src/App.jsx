import { useAuthState } from 'react-firebase-hooks/auth';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import AdminPage from './components/AdminPage';
import RankListsPage from './components/RankListsPage';
import UploadPage from './components/UploadPage';
import { auth } from './utils/firebase';
import { useEffect, useState } from 'react';
import { Paper, Tab, Tabs } from '@material-ui/core';

const admins = [ 'luisrdevy480@gmail.com', 'soyoscarrh@gmail.com' ];

const App = () => {
	const [ user ] = useAuthState(auth);
	const [ tab, setTab ] = useState(0);
	console.log(user);
	useEffect(
		() => {
			if (!user) return;
			if (!admins.includes(user.email)) auth.signOut();
		},
		[ user ]
	);
	const handleTabChange = (e, t) => {
		setTab(t);
	};
	return (
		<div>
			<CssBaseline />
			<Router>
				<Paper square>
					<Tabs
						value={tab}
						indicatorColor="primary"
						textColor="primary"
						onChange={handleTabChange}
						variant="fullWidth"
					>
						<Link onClick={() => setTab(0)} style={{ textDecoration: 'none' }} to="/">
							<Tab label="Home" />
						</Link>
						<Link
							onClick={() => setTab(1)}
							style={{ textDecoration: 'none' }}
							to="/ranking"
						>
							<Tab label="Ranking" />
						</Link>
						<Link
							onClick={() => setTab(2)}
							style={{ textDecoration: 'none' }}
							to="/upload"
						>
							<Tab label="Upload" />
						</Link>
						<Link
							onClick={() => setTab(3)}
							style={{ textDecoration: 'none' }}
							to="/admin"
						>
							<Tab label="Admin" />
						</Link>
					</Tabs>
				</Paper>

				<Switch>
					<Route exact path="/">
						<h1>Home</h1>
					</Route>
					<Route path="/ranking">
						<RankListsPage />
					</Route>
					<Route path="/admin">
						<AdminPage user={user} />
					</Route>
					<Route path="/upload">
						<UploadPage />
					</Route>
				</Switch>
			</Router>
		</div>
	);
};

export default App;
