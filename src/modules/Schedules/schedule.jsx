import React, { Component } from 'react';
import api from '../../services/api';
import AsyncSelect from 'react-select/async'

export default class Schedule extends Component {

	state = {
		customer_id: '',
		service_id: '',
		date: '',
		time: '',
		id: null,

		// valores para o select
		selected_customer: null,
		selected_service: null,
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
	    
	    // Se houver id, busca o registro na api
	    if (id) {

	    	api({
				url: 'schedules/'+id,
				method: 'get'
			}).then(response => {

				let {customer_id, service_id, date_time, customer, service} = response.data;

				let selected_customer = {
					id: customer.id,
					label: customer.name
				}

				let selected_service = {
					id: service.id,
					label: service.name
				}

				let [date, time] = date_time.split(' ');

				this.setState({customer_id, service_id, selected_customer, selected_service, date, time, id});
				
			}).catch(error=> {
				// Em caso de falha retorna pra listagem
				this.props.history.push("/agendamentos");
			})
	    }
	}

	// Toda vez que o usuário digitar no campo ele irá chamar a função e realizar um GET passando o termo digitado
	getCustomers(input) {

		return api({
			url: 'customers',
			method: 'get',
			params: {
				'search': input
			}
		}).then((response)=> {

			let customers = response.data.customers.map(customer => {
				return {label: customer.name, value: customer.id}
			});

			return customers;

		}).catch((error)=> {
			console.log(error);
		})

	}

	// Toda vez que o usuário digitar no campo ele irá chamar a função e realizar um GET passando o termo digitado
	getServices(input) {

		return api({
			url: 'services',
			method: 'get',
			params: {
				'search': input
			}
		}).then((response)=> {

			let services = response.data.services.map(service => {
				return {label: service.name, value: service.id}
			});

			return services;

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

							<AsyncSelect
								placeholder="Selecione um cliente"
								classNamePrefix="react-select" //Prefixo de classes para editar no css
								value={ this.state.selected_customer } // Valor do select
								// Setando o valor do select e o id do cliente no estado quando uma opção é selecionada
								onChange={selected => { this.setState({customer_id: selected.value, selected_customer: selected}) } } 
					            loadOptions={this.getCustomers} //Chama a função de busca toda vez que o usuário digita
					        />

						</div>

						<div className="form-group">
							<label> Serviço </label>

							<AsyncSelect
								placeholder="Selecione um serviço"
								classNamePrefix="react-select"
								value={ this.state.selected_service }
								onChange={selected => { this.setState({service_id: selected.value, selected_service: selected}) } }
					            loadOptions={this.getServices} />

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