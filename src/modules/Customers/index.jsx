import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Table from '../../components/Table';

import api from '../../services/api';

export default class Customers extends Component {

	state = {
  		customers: [],
  		pages: 0,
  		page: 1
	};

	constructor(props) {
	    super(props);
	    this.nextPage = this.nextPage.bind(this);
	}

	componentDidMount() {
		this.getCustomers();
	}

	getCustomers(page = 1) {

		api.get(`customers?page=${page}`)
		.then(response => {
			this.setState({ customers: response.data.rows, pages: response.data.count});
		}).catch(error=> {

		});

	}

	nextPage() {
		const { page, pages } = this.state;
		if (page == pages) return

		const pageNumber = page + 1;

		this.getCustomers(pageNumber);
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

					<div className="text-align-right">
						<button className="btn" onClick={this.nextPage} > > </button>
					</div>


				</div>

			</div>

		);
	}

}