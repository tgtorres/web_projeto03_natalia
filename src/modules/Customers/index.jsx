import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Table from '../../components/Table';

import api from '../../services/api';

export default class Customers extends Component {

	state = {
  		customers: []
	};

	componentDidMount() {

		api.get('customers').then(response => {
			this.setState({ customers: response.data.rows});
		}).catch(error=> {})

	}

	render() {

		return (

			<div className="container">

				<header>

					<h2>Clientes</h2>

					<Link className="btn" to="/clientes/adicionar">
						Adicionar Cliente
					</Link>

				</header>

				<div className="content direction-column">

					<Table headers={ ['Nome', 'Instagram', 'Telefone', 'Ações'] }>

						{
							this.state.customers.map(customer => (

								<tr key={customer.id}>
									<td> {customer.name} </td>
									<td> {customer.instagram} </td>
									<td> {customer.phone} </td>
									<td> ações </td>
								</tr>

							))
						}	

					</Table>

				</div>

			</div>

		);
	}

}