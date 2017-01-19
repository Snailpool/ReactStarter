import React from 'react';
import { render } from 'react-dom';
import AppRoutes from './appRoutes';
import { Router, Route, browserHistory } from 'react-router';


// Create an enhanced history that syncs navigation events with the store

render(
		<AppRoutes />
	, document.getElementById('app'));
