import React, { Component } from 'react';
import { FiChevronRight, FiChevronLeft, FiEdit3, FiTrash2 } from 'react-icons/fi'
import { Link } from 'react-router-dom';
import Table from '../../components/Table';
import { dateTimeFormat } from '../../Helpers';

import api from '../../services/api';

export default class Schedules extends Component {

	state = {
  		schedules: [],
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
		this.getSchedules();
	}

	getSchedules(page = 1) {

		api.get(`schedules?page=${page}`)
		.then(response => {

			this.setState({ schedules: response.data.schedules, pagination: response.data.pagination});

		}).catch(error=> {
			
			console.log(error);

		});

	}

	deleteSchedule(ev, id) {

		let confirm = window.confirm('Deseja realmente excluir este agendamento?');

		if (confirm) {
			api.delete(`schedules/${id}`)
			.then(response => {

				window.alert('Agendamento excluido com sucesso!');
				
				const schedules = this.state.schedules.filter(c => c.id !== id);
				
				this.setState({schedules});

			}).catch(error=> {
				
				window.alert('Falha ao excluir agendamento!');

			});
		}
	}

	nextPage() {
		const { page, total, limit } = this.state.pagination;

		if (page*limit >= total) return

		const pageNumber = page + 1;

		this.getSchedules(pageNumber);
	}

	previousPage() {
		const { page } = this.state.pagination;

		if ((page-1) <= 0) return

		const pageNumber = page - 1;

		this.getSchedules(pageNumber);
	}

	render() {

		const { page, total, limit } = this.state.pagination;

		return (

			<div className="container">

				<header>

					<h2>Agendamentos</h2>

					<Link className="btn" to="/agendamentos/adicionar">
						Adicionar Agendamento
					</Link>

				</header>

				<div className="content direction-column">

					<Table headers={ ['Cliente', 'Serviço', 'Data e hora'] }>

						{
							this.state.schedules.map(schedule => (

								<tr key={schedule.id}>
									
									<td> {schedule.customer.name} </td>
									
									<td> {schedule.service.name} </td>

									<td> { dateTimeFormat(schedule.date_time)} </td>

									<td className="actions"> 
										<Link className="btn" to={`/agendamentos/editar/${schedule.id}`} >
											<FiEdit3/>
										</Link>

										<button className="btn btn-red" onClick={e => this.deleteSchedule(e, schedule.id)} >
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