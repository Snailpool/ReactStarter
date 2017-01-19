import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import App from './components/app';
import Home from './components/home';
import About from './components/about';

class AppRoutes extends React.Component {
	render() {
		return (
			<Router history={browserHistory}>
				<Route path="/" component={App}>
				<IndexRoute component={Home} />
				<Route path="/home" component={Home} />
				<Route path="/about" component={About} />
				</Route>
			</Router>
		);
	}
}

export default AppRoutes;
