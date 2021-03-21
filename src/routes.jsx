import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Menu from './components/Menu';

import Home from './modules/Home';
import Customers from './modules/Customers';
import NewCustomer from './modules/Customers/customer';
import Services from './modules/Services';
import Schedules from './modules/Schedules';

export default function Routes() {

	return (
		<BrowserRouter>
			
			<Menu/>

			<Switch>
				<Route path="/" exact component={Home}/>
				<Route path="/clientes" exact component={Customers}/>
				<Route path="/clientes/adicionar" component={NewCustomer}/>
				<Route path="/servicos" component={Services}/>
				<Route path="/agendamentos" component={Schedules}/>
			</Switch>

		</BrowserRouter>

	);

}