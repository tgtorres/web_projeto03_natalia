import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Table from '../../components/Table';

export default function Customers() {

	return (

		<div className="container">

			<header>

				<h2>Clientes</h2>

				<Link className="btn" to="/clientes/adicionar">
					Adicionar Cliente
				</Link>

			</header>

			<div className="content direction-column">

				<Table headers={ ['Nome', 'Descrição', 'Ações'] }>

					<tr>
						
						<td> Natália </td>
						<td> Natdsajdaskldjlasália </td>
						<td> Excluir e Editar </td>

					</tr>

					<tr>
						
						<td> Lídia </td>
						<td> Natália </td>
						<td> Excluir e Editar </td>

					</tr>

				</Table>

			</div>

		</div>

	);
}