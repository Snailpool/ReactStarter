import React from 'react';
import { render } from 'react-dom';
import { Router, Route,IndexRoute, browserHistory } from 'react-router';


// Create an enhanced history that syncs navigation events with the store
import App from './components/app';
import Home from './components/home';
import About from './components/about';

const AppRoutes = (
	<Router history={browserHistory}>
		<Route path="/" component={App}>
			<IndexRoute component={Home} />
			<Route path="/" component={Home} />
			<Route path="/about" component={About} />
		</Route>
	</Router>
);


render(AppRoutes, document.getElementById('app'));
