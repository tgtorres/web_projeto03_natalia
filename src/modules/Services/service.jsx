import React, { Component } from 'react';
import api from '../../services/api';

export default class Service extends Component {

	state = {
		name: '',
		description: '',
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
				url: 'services/'+id,
				method: 'get'
			}).then(response => {

				let {name, description, id} = response.data;

				this.setState({name, description, id});
				
			}).catch(error=> {
				// Em caso de falha retorna pra listagem
				this.props.history.push("/servicos");
			})
	    }
	}

	handleSubmit(e) {

		e.preventDefault();

		let { name, description} = this.state; 

		// Verifica se existe id, se sim realiza um PUT, se não realiza um POST
		api({
			url: 'services'+ (this.state.id ? '/'+this.state.id : ''),
			method: this.state.id ? 'put' : 'post',
			data: {name, description}
		}).then(response => {

			this.props.history.push("/servicos");

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
					
					<h2> { this.state.id ? 'Editar' : 'Adicionar' } Serviço </h2>
				
				</header>

				<div className="content justify-center">

					<form className="form column" onSubmit={this.handleSubmit}>

						<div className="form-group">
							<label> Nome </label>
							<input name="name" value={ this.state.name } onChange={ e => { this.setState({name: e.target.value}) } } />
						</div>

						<div className="form-group">
							<label> Descrição </label>
							<input name="description" value={ this.state.description } onChange={ e => { this.setState({description: e.target.value}) } }/>
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