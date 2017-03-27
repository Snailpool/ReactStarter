import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import AppRouter from './components/AppRouter.js';
// AppContainer is a necessary wrapper component for HMR

// render the HMR wrapper and entry component
const render = (Component) => {
	ReactDOM.render(
		<AppContainer>
			<AppRouter />
		</AppContainer>,
		document.getElementById('root')
	);
};

render(AppRouter);

// Hot Module Replacement API
if (module.hot) {
	module.hot.accept('./components/App/App', () => {
		render(AppRouter);
	});
}
