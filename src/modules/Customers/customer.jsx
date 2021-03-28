import React, { Component } from 'react';
import api from '../../services/api';
import { phoneFormat } from '../../Helpers';

export default class Customer extends Component {

	state = {
		name: '',
		instagram: '',
		phone: '',
		id: null,
	}

	constructor(props) {
	    super(props);
	    this.handleSubmit = this.handleSubmit.bind(this);
	    this.handlePhone = this.handlePhone.bind(this);
	}

	componentDidMount() {
	    // Pega o id passado pela url
	    let id = this.props.match.params.id;
	    
	    // Se houver id, busca o registro na api
	    if (id) {

	    	api({
				url: 'customers/'+id,
				method: 'get'
			}).then(response => {

				let {name, instagram, phone} = response.data;

				this.setState({name, instagram, phone, id});
				
			}).catch(error=> {
				// Em caso de falha retorna pra listagem
				this.props.history.push("/clientes");
			})
	    }
	}

	handleSubmit(e) {

		e.preventDefault();

		let { name, instagram, phone} = this.state; 

		// Verifica se existe id, se sim realiza um PUT, se não realiza um POST
		api({
			url: 'customers'+ (this.state.id ? '/'+this.state.id : ''),
			method: this.state.id ? 'put' : 'post',
			data: {name, instagram, phone}
		}).then(response => {

			this.props.history.push("/clientes");

		}).catch(error=> {
			let msg = '';

			error.response.data.errors.forEach(e => {
				msg += e + '\n'
			})

			alert(msg);

		});

	}

	handlePhone(event) {
  		event.target.value = phoneFormat(event.target.value);
  		this.setState({phone: event.target.value});
	}

	render() {

		return (

			<div className="container">

				<header>
					
					<h2> { this.state.id ? 'Editar' : 'Adicionar' } Cliente </h2>
				
				</header>

				<div className="content justify-center">

					<form className="form column" onSubmit={this.handleSubmit}>

						<div className="form-group">
							<label> Nome </label>
							<input name="name" value={ this.state.name } onChange={ e => { this.setState({name: e.target.value}) } } />
						</div>

						<div className="form-group">
							<label> Telefone </label>
							<input name="phone" value={ this.state.phone } onChange={ e => { this.setState({phone: e.target.value}) } } />
						</div>

						<div className="form-group">
							<label> Instagram </label>
							<input name="instagram" value={ this.state.instagram } onChange={ e => { this.setState({instagram: e.target.value}) } } />
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