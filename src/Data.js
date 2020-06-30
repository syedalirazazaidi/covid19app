import React from 'react'
import './Data.css'
import CountryPicker from './components/CountryPicker'
export const Data_Table = ({country,data}) => {
    console.log("4444444444",country,data)
    return (
        <div className='container'>
            <table>
            <thead>
					<tr>
						<th>Country</th>
						<th>Infected</th>
	<th>{}</th>
						<th>Deaths</th>
					</tr>
				</thead>
                <tbody>
                <tr class="priority-200">
						<td>{country}</td>
						<td>{}</td>
						<td>
							<i class="fas fa-circle"></i>
							200
						</td>
						<td>190</td>
					</tr>
                </tbody>
            </table> 
        </div>
    )
}
