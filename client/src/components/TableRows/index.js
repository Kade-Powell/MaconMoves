import React from 'react';
import PropTypes from 'prop-types';

const TableRows = ({ schedule }) => {
	let rows = [];
	for (let i = 0; i < schedule.length; i++) {
		rows.push(
			<tr key={i}>
				<td>{schedule[i].timeSlot}</td>
				<td>{schedule[i].name}</td>
				<td>{schedule[i].phoneNumber}</td>
			</tr>
		);
	}
	return rows;
};

TableRows.propTypes = {
	schedule: PropTypes.array.isRequired,
};

export default TableRows;
