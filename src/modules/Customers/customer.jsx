import React, { useState, useEffect } from 'react';

export default function Customer() {

	return (

		<div className="container">

			<header>
				
				<h2>Adicionar Cliente</h2>
			
			</header>

			<div className="content justify-center">

				<form className="form column">

					<div className="form-group">
						<label>Nome</label>
						<input/>
					</div>

					<div className="form-group">
						<label>Telefone</label>
						<input/>
					</div>

					<div className="form-group">
						<label>Instagram</label>
						<input/>
					</div>

					<div className="text-align-right">
						<button className="btn" type="submit">Salvar</button>
					</div>

				</form>

			</div>

		</div>

	);
}