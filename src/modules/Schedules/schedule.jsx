import React, { Component } from 'react';
import api from '../../services/api';

export default class Schedule extends Component {

	state = {
		customer_id: '',
		service_id: '',
		date: '',
		time: '',
		id: null,
	}

	constructor(props) {
	    super(props);
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

				let {customer_id, service_id, date_time} = response.data;

				let [date, time] = date_time.split(' ');

				this.setState({customer_id, service_id, date, time, id});
				
			}).catch(error=> {
				// Em caso de falha retorna pra listagem
				this.props.history.push("/agendamentos");
			})
	    }
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
							<input name="customer_id" value={ this.state.customer_id } onChange={ e => { this.setState({customer_id: e.target.value}) } } />
						</div>

						<div className="form-group">
							<label> Serviço </label>
							<input name="service_id" value={ this.state.service_id } onChange={ e => { this.setState({service_id: e.target.value}) } } />
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