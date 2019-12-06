const passport = require('passport');
const axios = require('axios');
var GitHubStrategy = require('passport-github').Strategy;
var db = require('../database/index.js');

passport.use(
  new GitHubStrategy(
    {
      clientID: 'a34af9c4a1fdc8a7ef9b', //FIXME: Add this to config file
      clientSecret: '8c9c4366d327e1d976f9452ef440fdf25ef8265e', //FIXME: Add this to config file
      callbackURL: 'http://localhost:4000/auth/github/callback', //FIXME: Add this to config file
      profileFields: ['id', 'displayName', 'username', 'profileUrl']
    },
    async (accessToken, refreshToken, profile, done) => {
      var user;
      //TODO: get or create new user, see example below
      db.users.getUserByEmail(function(err, results) {
        user = results;
        console.log(user);
      }, profile._json.email);
      if (user === null) {
        axios.get(profile._json.organizations_url).then(function(orgz) {
          var validUser = false;
          console.log(orgz.data);
          orgz.data.forEach(org => {
            if (org.login === 'hackreactor') {
              done(
                null,
                db.users.addUser(
                  [
                    profile._json.name,
                    profile._json.login,
                    profile._json.email,
                    accessToken,
                    profile.profileUrl,
                    profile.photos[0].value
                  ],
                  function(err, done) {
                    console.log('done');
                  }
                )
              );
            }
          });
        });
      }
      console.log(user, 'sasdads');
      done(null, user);
    }
  )
);
// passport.use(
//   new TwitterStrategy(
//     {
//       consumerKey: keys.TWITTER_CONSUMER_KEY,
//       consumerSecret: keys.TWITTER_CONSUMER_SECRET,
//       callbackURL: "/auth/twitter/redirect"
//     },
//     async (token, tokenSecret, profile, done) => {
//       // find current user in UserModel
//       const currentUser = await User.findOne({
//         twitterId: profile._json.id_str
//       });
//       // create new user if the database doesn't have this user
//       if (!currentUser) {
//         const newUser = await new User({
//           name: profile._json.name,
//           screenName: profile._json.screen_name,
//           twitterId: profile._json.id_str,
//           profileImageUrl: profile._json.profile_image_url
//         }).save();
//         if (newUser) {
//           done(null, newUser);
//         }
//       }
//       done(null, currentUser);
//     }
//   )
// );

// serialize the user.id to save in the cookie session
// so the browser will remember the user when login
passport.serializeUser(function(user, cb) {
  cb(null, user);
}); // deserialize the cookieUserId to user in the database
passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
  //TODO: get user from DB, see example below:
  //   User.findById(id)
  //     .then(user => {
  //       done(null, user);
  //     })
  //     .catch(e => {
  //       done(new Error("Failed to deserialize an user"));
  //     });
});
