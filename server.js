//////////////////////////////////////////////////////////////////
//The Main Entry point for our program
//////////////////////////////////////////////////////////////////
const express = require('express');
const connctDB = require('./config/db');
const path = require('path');

const app = express();

//Connect Database
connctDB();

//Init Middleware
//this below should allow us to use the body parser, gets data from body..
app.use(express.json({ extended: false }));

//Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));
app.use(
  '/api/configGenerator/ingressQos',
  require('./routes/api/configGenerator/ingressQos')
);
app.use(
  '/api/configGenerator/egressQos',
  require('./routes/api/configGenerator/egressQos')
);
app.use(
  '/api/configGenerator/service',
  require('./routes/api/configGenerator/service')
);

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folders with express
  app.use(express.static('client/build'));
  app.use(express.static('client/uploads'));
  // * means if any route besides the above api specified routes then..
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

//look for environment variable to get the port from to deploy on heroku || port 5000 locally
const PORT = process.env.PORT || 5000;

app.listen(PORT, '127.0.0.1', () =>
  console.log(`Server started on port ${PORT}`)
);
