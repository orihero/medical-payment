import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Home from '../views/Home';
import Wizard from '../views/Wizard';
import Agreement from '../views/Agreement';
import HomeDraw from '../views/HomeDraw';

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
				<Route path='/agreement' exact>
					<Agreement />
				</Route>
				<Route path='/home-draw/:typeTest/:hasPresc' exact>
					<HomeDraw />
				</Route>
			</Switch>
		</Router>
	);
}