import React from 'react';
import { browserHistory, Router, Route, IndexRoute } from 'react-router';
import App from './App/App';
import About from './About/About';
import Home from './Home/Home';
import NoMatch from './Nomatch';

//  the router of app
const AppRouter = () => (
	<Router history={browserHistory}>
		<Route path="/" component={App}>
			<IndexRoute component={Home} />
			<Route path="home" component={Home}/>
			<Route path="about" component={About}/>
			<Route path="*" scomponent={NoMatch}/>
		</Route>
	</Router>
);

export default AppRouter;
