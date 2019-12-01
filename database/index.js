var mysql = require("mysql");
const path = require("path");
var config = require(path.join(__dirname, "../config/config.js"));
var sequelize = require("sequelize");

//Connect to Database

var connection = mysql.createConnection({
  host: config.host,
  user: config.user,
  password: config.password,
  database: config.database
});

module.exports = connection;
module.exports = {
  users: {
    // Ditto as above.
    get: function(callback) {
      db.query(
        "select * from `rbk-space`.users  as u left join `rbk-space`.userDetails as ud on u.userID = ud.userId",
        function(err, results) {
          if (err) {
            console.log("Can not fetch the user");
          } else {
            // console.log(rows);
            callback(err, results);
          }
        }
      );
    }
  }
};
