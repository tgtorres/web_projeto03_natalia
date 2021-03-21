import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Menu() {

	const { pathname } = useLocation();

	const path = pathname.split('/')[1];

	return (

		<aside className="menu">

			<Link to="/">
				<h1>Agenda</h1>
			</Link>

			<nav>
			
				<Link className={ path === 'clientes' ? 'active' : '' } to="/clientes"> Clientes </Link>
				<Link className={ path === 'servicos' ? 'active' : '' } to="/servicos"> Serviços </Link>
				<Link className={ path === 'agendamentos' ? 'active' : '' } to="/agendamentos"> Agendamentos </Link>

			</nav>

		</aside>

  	);
}