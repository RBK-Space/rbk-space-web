const router = require('express').Router();
const passport = require('passport');
const config = require('../../config/config');
const CLIENT_HOME_PAGE_URL = global.gConfig.url;
const path = require('path');
const fs = require('fs');

// when login is successful, retrieve user info
router.get(`${global.gConfig.url}/login/success`, (req, res) => {
  if (req.user) {
    res.json({
      success: true,
      message: 'user has successfully authenticated',
      user: req.user,
      cookies: req.cookies
    });
  } else {
    res.send('Error in authentication');
  }
});

// when login failed, send failed msg
router.get(`${global.gConfig.url}/login/failed`, (req, res) => {
  res.status(401).json({
    success: false,
    message: 'user failed to authenticate.'
  });
});

// When logout, redirect to client
router.get(`${global.gConfig.url}/logout`, (req, res) => {
  req.logout();
  res.redirect(CLIENT_HOME_PAGE_URL);
});

// auth with github
router.get(`${global.gConfig.url}/github`, passport.authenticate('github'));
router.get(
  `${global.gConfig.url}/auth/github`,
  passport.authenticate('github')
);

router.get(`${global.gConfig.url}/failed`, (req, res) => {
  fs.readFile(
    path.join(__dirname, '../../public/unauthorized.html'),
    'utf8',
    function(err, data) {
      if (err) throw err;
      res.status(401).send(data);
    }
  );
});
// redirect to home page after successfully login via github
router.get(
  `${global.gConfig.url}/github/callback`,
  passport.authenticate('github', {
    failureRedirect: `${global.gConfig.url}/auth/failed`
  }),
  function(req, res) {
    res.redirect(`${CLIENT_HOME_PAGE_URL}/home`);
  }
);

module.exports = router;
