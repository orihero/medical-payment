import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from '../views/Home';
import Wizard from '../views/Wizard';

export default function AppRouter() {
	return (
		<Router>
			<Switch>
				<Route path='/' exact>
					<Home />
				</Route>
				<Route path='/appointment' exact>
					<Wizard />
				</Route>
			</Switch>
		</Router>
	);
}
