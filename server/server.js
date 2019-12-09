//express
const express = require('express');
const cors = require('cors');

//environment variables
process.env.NODE_ENV = 'development';

//config
const config = require('../config/config.js');

//module
const app = express();
//routes
const routes = require('./routes/index');
app.use('/', routes);
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});
app.use(
  cors({
    origin: 'http://localhost:3000', // allow to server to accept request from different origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true // allow session cookie from browser to pass through
  })
);

// app.listen(global.gConfig.node_port, () => {
//   console.log(
//     `${global.gConfig.app_name} listening on port ${global.gConfig.node_port}`
//   );
// });
app.listen(3001, () => {
  console.log(`${global.gConfig.app_name} listening on port 3001`);
});
