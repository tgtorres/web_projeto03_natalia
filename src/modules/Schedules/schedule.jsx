import React, { Component } from 'react';
import api from '../../services/api';

export default class Schedule extends Component {

	state = {
		customer_id: '',
		service_id: '',
		customer: {},
		service: {},
		date: '',
		time: '',
		id: null,

		// Clientes e serviços para o Select
		customers: [],
		services: []
	}

	constructor(props) {
	    super(props);
	    this.getCustomers = this.getCustomers.bind(this);
	    this.getServices = this.getServices.bind(this);
	    this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
	    // Pega o id passado pela url
	    let id = this.props.match.params.id;

	    // Chama as buscas de clientes e serviços
	    this.getCustomers();
	    this.getServices();
	    
	    // Se houver id, busca o registro na api
	    if (id) {

	    	api({
				url: 'schedules/'+id,
				method: 'get'
			}).then(response => {

				let {customer_id, service_id, date_time, customer, service} = response.data;

				let [date, time] = date_time.split(' ');

				this.setState({customer_id, service_id, customer, service, date, time, id});
				
			}).catch(error=> {
				// Em caso de falha retorna pra listagem
				this.props.history.push("/agendamentos");
			})
	    }
	}

	// Busca os clientes
	getCustomers() {

		api({
			url: 'customers?limit=500',
			method: 'get'
		}).then((response)=> {

			this.setState({customers: response.data.customers});

		}).catch((error)=> {
			console.log(error);
		})

	}

	// Busca os serviços
	getServices() {

		api({
			url: 'services?limit=500',
			method: 'get'
		}).then((response)=> {

			this.setState({services: response.data.services});

		}).catch((error)=> {
			console.log(error);
		})
	}

	handleSubmit(e) {

		e.preventDefault();

		let {customer_id, service_id, date, time} = this.state; 

		let date_time = date + ' ' + time;

		// Verifica se existe id, se sim realiza um PUT, se não realiza um POST
		api({
			url: 'schedules'+ (this.state.id ? '/'+this.state.id : ''),
			method: this.state.id ? 'put' : 'post',
			data: {customer_id, service_id, date_time}
		}).then(response => {

			this.props.history.push("/agendamentos");

		}).catch(error=> {

			let msg = '';

			error.response.data.errors.forEach(e => {
				msg += e + '\n'
			})

			alert(msg);

		});

	}

	render() {

		return (

			<div className="container">

				<header>
					
					<h2> { this.state.id ? 'Editar' : 'Adicionar' } Agendamento </h2>
				
				</header>

				<div className="content justify-center">

					<form className="form column" onSubmit={this.handleSubmit}>

						<div className="form-group">
							<label> Cliente </label>
							<select name="customer_id" value={this.state.customer_id} onChange={ e => { this.setState({customer_id: e.target.value}) } } > 
								{
									this.state.customers.map(customer => (
										<option value={customer.id} selected={customer.id === this.state.customer_id} >
											{ customer.name }
										</option>
									))
								}
							</select>
						</div>

						<div className="form-group">
							<label> Serviço </label>
							<select name="service_id" value={this.state.service_id} onChange={ e => { this.setState({service_id: e.target.value}) } } > 
								{
									this.state.services.map(service => (
										<option value={service.id} selected={service.id === this.state.service_id}>
											{ service.name }
										</option>
									))
								}
							</select>
						</div>

						<div className="form-row">

							<div className="form-group">
								<label> Data </label>
								<input name="date" type="date" value={ this.state.date } onChange={ e => { this.setState({date: e.target.value}) } }/>
							</div>

							<div className="form-group">
								<label> Hora </label>
								<input name="time" type="time" value={ this.state.time } onChange={ e => { this.setState({time: e.target.value}) } }/>
							</div>

						</div>

						<div className="text-align-right">
							<button className="btn" type="submit"> Salvar </button>
						</div>

					</form>

				</div>

			</div>

		)

	}

}