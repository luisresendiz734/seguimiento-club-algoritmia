import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import AdminPage from './components/AdminPage';
import RankListsPage from './components/RankListsPage';
import UploadPage from './components/UploadPage';

const App = () => {
	return (
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
					<AdminPage />
				</Route>
				<Route path="/upload">
					<UploadPage />
				</Route>
			</Switch>
		</Router>
	);
};

export default App;
