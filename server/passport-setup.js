const passport = require('passport');
const config = require('../config/config');
const axios = require('axios');
var GitHubStrategy = require('passport-github').Strategy;
var db = require('../database/index.js');

passport.use(
  new GitHubStrategy(
    {
      clientID: global.gConfig.githubClientId,
      clientSecret: global.gConfig.githubClientSecret,
      callbackURL: global.gConfig.githubCallbackUrl
    },
    async (accessToken, refreshToken, profile, done) => {
      //if the logged in user is already exists in the DB
      await db.users.getUserByEmail(function(err, results) {
        if (results.length > 0) {
          done(null, results);
        } else {
          //Create new user
          //Check if the user is a member in rbk-org organization
          axios.get(profile._json.organizations_url).then(function(orgz) {
            orgz.data.forEach(org => {
              if (org.login === 'rbk-org') {
                db.users.addUser(
                  [
                    profile._json.name,
                    profile._json.login,
                    profile._json.email,
                    accessToken,
                    profile.profileUrl,
                    profile.photos[0].value
                  ],
                  function(err, user) {
                    done(null, user);
                  }
                );
              }
            });
          });
        }
      }, profile._json.email);
    }
  )
);

// serialize the user.id to save in the cookie session
// so the browser will remember the user when login
passport.serializeUser(function(user, cb) {
  cb(null, user);
});

// deserialize the cookieUserId to user in the database
passport.deserializeUser(function(obj, cb) {
  db.users.getUserByEmail(function(err, user) {
    cb(null, user);
  }, obj[0].email);
});
