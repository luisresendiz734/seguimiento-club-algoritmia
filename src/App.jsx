import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import RankListsPage from './components/RankListsPage';

// context del usuario envuelve a Router
const App = () => {
	return (
		<Router>
			<Switch>
				<Route exact path="/">
					<h1>Home</h1>
				</Route>
				<Route path="/ranking">
					<RankListsPage />
				</Route>
			</Switch>
		</Router>
	);
};

export default App;
