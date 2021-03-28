import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Menu from './components/Menu';

import Home from './modules/Home';
import Customers from './modules/Customers';
import CustomerForm from './modules/Customers/customer';
import Services from './modules/Services';
import ServiceForm from './modules/Services/service';
import Schedules from './modules/Schedules';
import ScheduleForm from './modules/Schedules/schedule';

export default function Routes() {

	return (
		<BrowserRouter>
			
			<Menu/>

			<Switch>
				<Route path="/" exact component={Home}/>
				<Route path="/clientes" exact component={Customers}/>
				<Route path="/clientes/adicionar" component={CustomerForm}/>
				<Route path="/clientes/editar/:id" component={CustomerForm}/>
				<Route path="/servicos" exact component={Services}/>
				<Route path="/servicos/adicionar" component={ServiceForm}/>
				<Route path="/servicos/editar/:id" component={ServiceForm}/>
				<Route path="/agendamentos" exact component={Schedules}/>
				<Route path="/agendamentos/adicionar" component={ScheduleForm}/>
				<Route path="/agendamentos/editar/:id" component={ScheduleForm}/>
			</Switch>

		</BrowserRouter>

	);

}