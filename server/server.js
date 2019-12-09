//express
const express = require('express');
//auth config
const passport = require('passport');
const passportSetup = require('./helpers/passport-setup');
const cookieSession = require('cookie-session');
const session = require('express-session');
const cors = require('cors');
const cookieParser = require('cookie-parser'); // parse cookie header

//environment variables
process.env.NODE_ENV = 'development';

//config
const config = require('../config/config.js');

//module
const app = express();

//auth setup
app.use(require('body-parser').urlencoded({ extended: true }));

// set up cors to allow us to accept requests from our client
app.use(
  cors({
    origin: 'http://localhost:3000', // allow to server to accept request from different origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true // allow session cookie from browser to pass through
  })
);
// deserialize cookie from the browser
app.use(cookieParser());
app.use(
  require('express-session')({
    secret: global.gConfig.sessionSecret,
    resave: true,
    saveUninitialized: true
  })
);
// passport setup continue
app.use(passport.initialize());
app.use(passport.session());
//check routes middleware
const authCheck = (req, res, next) => {
  if (!req.user) {
    res.status(401).json({
      authenticated: false,
      message: 'user has not been authenticated'
    });
  } else {
    next();
  }
};
app.get('/', authCheck, (req, res) => {
  res.status(200).json({
    authenticated: true,
    message: 'user successfully authenticated',
    user: req.user,
    cookies: req.cookies
  });
});
//routes
const routes = require('./routes/index');
app.use('/', routes);

const authRoutes = require('./routes/auth-routes');
app.use('/auth', authRoutes);

app.listen(global.gConfig.node_port, () => {
  console.log(
    `${global.gConfig.app_name} listening on port ${global.gConfig.node_port}`
  );
});
