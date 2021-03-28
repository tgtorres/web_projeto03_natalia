import React from 'react';
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

						<th className="actions">
							Ações
						</th>

					</tr>

				</thead>

				<tbody>

					{ children }

				</tbody>

			</table>

		</div>
	);
}