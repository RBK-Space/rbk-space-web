var mysql = require("mysql");

//Connect to Database using the global configuration

var connection = mysql.createConnection({
  host: global.gConfig.host,
  user: global.gConfig.user,
  password: global.gConfig.password,
  database: global.gConfig.database
});

module.exports = connection;
module.exports = {
  users: {
    // get all users data
    get: function(callback) {
      connection.query("call `rbk-space`.getUsers()", function(err, results) {
        if (err) {
          console.log("Can not fetch users", err);
        } else {
          // console.log(rows);
          callback(err, results);
        }
      });
    },
    //static = refactor to dynamic
    getUserById: function(callback) {
      var userId = 1;
      connection.query("call `rbk-space`.getUserById(?)", userId, function(
        err,
        results
      ) {
        if (err) {
          console.log("Can not fetch user", err);
        } else {
          callback(err, results);
        }
      });
    },
    getUserByName: function(callback) {
      var name = "Fay";
      connection.query("call `rbk-space`.getUserByName(?)", name, function(
        err,
        results
      ) {
        if (err) {
          console.log("Can not fetch user", err);
        } else {
          callback(err, results);
        }
      });
    }
  }
};
