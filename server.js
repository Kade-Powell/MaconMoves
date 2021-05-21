const express = require('express');
const path = require('path');

const app = express();

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
	// Set static folders with express
	app.use(express.static('client/build'));

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

//look for environment variable to get the port || port 5000 locally
const PORT = process.env.PORT || 5000;

app.listen(PORT, '127.0.0.1', () =>
	console.log(`Server started on port ${PORT}`)
);
