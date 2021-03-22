import React, { useState, useEffect } from 'react';
import './styles.css';

export default function Table({headers, children}) {

	return (

		<div className="table">

			<table>

				<thead>

					<tr>

						{ headers.map((header, index) => (

							<th key={index} >

								{ header }

							</th>	

						)) }

					</tr>

				</thead>

				<tbody>

					{ children }

				</tbody>

			</table>

		</div>
	);
}