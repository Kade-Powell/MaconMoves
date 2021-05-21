import React from 'react';
import { Provider } from 'react-redux';
import store from './store';

import TableRows from './components/TableRows';

import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';

const App = () => {
	return (
		<Provider store={store}>
			<Container>
				<Table responsive striped bordered hover>
					<thead>
						<tr>
							<th>Time Slot</th>
							<th>Name</th>
							<th>Phone Number</th>
						</tr>
					</thead>
					<tbody>
						<TableRows schedule={store.getState('schedule').schedule} />
					</tbody>
				</Table>
			</Container>
		</Provider>
	);
};

export default App;
