import React, { Component } from 'react';
import { FiChevronRight, FiChevronLeft, FiEdit3, FiTrash2 } from 'react-icons/fi'
import { Link } from 'react-router-dom';
import Table from '../../components/Table';

import api from '../../services/api';

export default class Services extends Component {

	state = {
  		services: [],
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
		this.getServices();
	}

	getServices(page = 1) {

		api.get(`services?page=${page}`)
		.then(response => {

			this.setState({ services: response.data.services, pagination: response.data.pagination});

		}).catch(error=> {
			
			console.log(error);

		});

	}

	deleteService(ev, id) {

		let confirm = window.confirm('Deseja realmente excluir este serviço?');

		if (confirm) {
			api.delete(`services/${id}`)
			.then(response => {

				window.alert('Serviço excluido com sucesso!');
				
				const services = this.state.services.filter(c => c.id !== id);
				
				this.setState({services});

			}).catch(error=> {
				
				window.alert('Falha ao excluir serviço!');

			});
		}
	}

	nextPage() {
		const { page, total, limit } = this.state.pagination;

		if (page*limit >= total) return

		const pageNumber = page + 1;

		this.getServices(pageNumber);
	}

	previousPage() {
		const { page } = this.state.pagination;

		if ((page-1) <= 0) return

		const pageNumber = page - 1;

		this.getServices(pageNumber);
	}


	render() {

		const { page, total, limit } = this.state.pagination;

		return (

			<div className="container">

				<header>

					<h2>Serviços</h2>

					<Link className="btn" to="/servicos/adicionar">
						Adicionar Serviço
					</Link>

				</header>

				<div className="content direction-column">

					<Table headers={ ['Nome', 'Descrição'] }>

						{
							this.state.services.map(service => (

								<tr key={service.id}>
									
									<td> {service.name} </td>
									
									<td> {service.description} </td>

									<td className="actions"> 
										<Link className="btn" to={`/servicos/editar/${service.id}`} >
											<FiEdit3/>
										</Link>

										<button className="btn btn-red" onClick={e => this.deleteService(e, service.id)} >
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