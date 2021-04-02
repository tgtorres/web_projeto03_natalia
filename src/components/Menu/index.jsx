import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiUsers, FiScissors, FiCalendar, FiBook } from 'react-icons/fi';
import './styles.css';

export default function Menu() {

	const { pathname } = useLocation();

	//Pega a primeira parte da url, para identificar o módulo atual
	const path = pathname.split('/')[1];

	return (

		<aside className="menu">

			<Link to="/">
				<h1> <FiCalendar/> Agenda</h1>
			</Link>

			<nav>
				
				<Link className={ path === 'clientes' ? 'active' : '' } to="/clientes"> <FiUsers/> Clientes </Link>
				<Link className={ path === 'servicos' ? 'active' : '' } to="/servicos"> <FiScissors/> Serviços </Link>
				<Link className={ path === 'agendamentos' ? 'active' : '' } to="/agendamentos"> <FiBook/> Agendamentos </Link>

			</nav>

		</aside>

  	);
}