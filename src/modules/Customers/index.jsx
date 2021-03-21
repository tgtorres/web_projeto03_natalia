import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

export default function Customers() {

	return (

		<div className="container">

			<h2>Clientes</h2>

			<Link className="btn" to="/clientes/adicionar">
				Adicionar Cliente
			</Link>

		</div>

	);
}