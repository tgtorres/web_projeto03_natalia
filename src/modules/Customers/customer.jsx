import React, { Component } from 'react';
import api from '../../services/api';

export default class Customer extends Component {

	constructor(props) {
	    super(props);
	    this.handleSubmit = this.handleSubmit.bind(this);
	}

	state = {
		name: '',
		instagram: '',
		phone: '',
	}

	handleSubmit(e) {

		e.preventDefault();

		let data = 

		api({
			url: 'customers',
			method: 'post',
			data: this.state
		}).then(response => {
			 this.props.history.push("/clientes");
		}).catch(error=> {})

	}

	render() {

		return (

			<div className="container">

				<header>
					
					<h2>Adicionar Cliente</h2>
				
				</header>

				<div className="content justify-center">

					<form className="form column" onSubmit={this.handleSubmit}>

						<div className="form-group">
							<label>Nome</label>
							<input name="name" value={ this.state.name } onChange={ e => { this.setState({name: e.target.value}) } } />
						</div>

						<div className="form-group">
							<label>Telefone</label>
							<input name="phone" value={ this.state.phone } onChange={ e => { this.setState({phone: e.target.value}) } } />
						</div>

						<div className="form-group">
							<label>Instagram</label>
							<input name="instagram" value={ this.state.instagram } onChange={ e => { this.setState({instagram: e.target.value}) } } />
						</div>

						<div className="text-align-right">
							<button className="btn" type="submit">Salvar</button>
						</div>

					</form>

				</div>

			</div>

		)

	}

}