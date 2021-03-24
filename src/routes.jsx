import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Menu from './components/Menu';

import Home from './modules/Home';
import Customers from './modules/Customers';
import CustomerForm from './modules/Customers/customer';
import Services from './modules/Services';
import Schedules from './modules/Schedules';

export default function Routes() {

	return (
		<BrowserRouter>
			
			<Menu/>

			<Switch>
				<Route path="/" exact component={Home}/>
				<Route path="/clientes" exact component={Customers}/>
				<Route path="/clientes/adicionar" component={CustomerForm}/>
				<Route path="/clientes/editar/:id" component={CustomerForm}/>
				<Route path="/servicos" component={Services}/>
				<Route path="/agendamentos" component={Schedules}/>
			</Switch>

		</BrowserRouter>

	);

}