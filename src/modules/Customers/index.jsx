import React, { Component } from 'react';
import { FiChevronRight, FiChevronLeft, FiEdit3, FiTrash2 } from 'react-icons/fi'
import { Link } from 'react-router-dom';
import Table from '../../components/Table';
import { phoneFormat } from '../../Helpers';

import api from '../../services/api';

export default class Customers extends Component {

	state = {
  		customers: [],
  		pagination: {
  			limit: 0,
  			page: 0, 
  			total: 0
  		}
	};

	constructor(props) {
	    super(props);
	    this.nextPage = this.nextPage.bind(this);
	    this.previousPage = this.previousPage.bind(this);
	}

	componentDidMount() {
		this.getCustomers();
	}

	getCustomers(page = 1) {

		api.get(`customers?page=${page}`)
		.then(response => {

			this.setState({ customers: response.data.customers, pagination: response.data.pagination});

		}).catch(error=> {
			
			console.log(error);

		});

	}

	deleteCustomer(ev, id) {

		let confirm = window.confirm('Deseja realmente excluir este cliente?');

		if (confirm) {
			api.delete(`customers/${id}`)
			.then(response => {

				window.alert('Cliente excluido com sucesso!');
				
				const customers = this.state.customers.filter(c => c.id !== id);
				
				this.setState({customers});

			}).catch(error=> {
				
				window.alert('Falha ao excluir cliente!');

			});
		}
	}

	nextPage() {
		const { page, total, limit } = this.state.pagination;

		if (page*limit >= total) return

		const pageNumber = page + 1;

		this.getCustomers(pageNumber);
	}

	previousPage() {
		const { page } = this.state.pagination;

		if ((page-1) <= 0) return

		const pageNumber = page - 1;

		this.getCustomers(pageNumber);
	}


	render() {

		const { page, total, limit } = this.state.pagination;

		return (

			<div className="container">

				<header>

					<h2>Clientes</h2>

					<Link className="btn" to="/clientes/adicionar">
						Adicionar Cliente
					</Link>

				</header>

				<div className="content direction-column">

					<Table headers={ ['Nome', 'Instagram', 'Telefone'] }>

						{
							this.state.customers.map(customer => (

								<tr key={customer.id}>
									
									<td> {customer.name} </td>
									
									<td> {customer.instagram} </td>
									
									<td> { phoneFormat(customer.phone)} </td>

									<td className="actions"> 
										<Link className="btn" to={`/clientes/editar/${customer.id}`} >
											<FiEdit3/>
										</Link>

										<button className="btn btn-red" onClick={e => this.deleteCustomer(e, customer.id)} >
											<FiTrash2/>
										</button>
									</td>

								</tr>

							))
						}	

					</Table>

					<div className="pagination-buttons">
						<button className="btn" disabled={page-1 <= 0 ? 'disabled' : '' } onClick={this.previousPage} > <FiChevronLeft/> </button>
						<button className="btn" disabled={page*limit >= total ? 'disabled' : '' } onClick={this.nextPage} > <FiChevronRight/> </button>
					</div>

				</div>

			</div>

		);
	}

}