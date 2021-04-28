import { useAuthState } from 'react-firebase-hooks/auth';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import AdminPage from './components/AdminPage';
import RankListsPage from './components/RankListsPage';
import UploadPage from './components/UploadPage';
import { auth } from './utils/firebase';
import { useEffect } from 'react';

const admins = [ 'bAADhBkQ2rbplfrCtxJf4pQAO3B3' ];

const App = () => {
	const [ user ] = useAuthState(auth);
	useEffect(
		() => {
			if (!user) return;
			if (!admins.includes(user.uid)) auth.signOut();
		},
		[ user ]
	);
	return (
		<div>
			<CssBaseline />
			<Router>
				<nav>
					<li>
						<Link to="/">Home</Link>
					</li>
					<li>
						<Link to="/ranking">Ranking</Link>
					</li>
					<li>
						<Link to="/admin">Admin</Link>
					</li>
					<li>
						<Link to="/upload">Upload</Link>
					</li>
				</nav>
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
