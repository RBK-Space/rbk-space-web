var mysql = require("mysql");
const path = require("path");
var config = require(path.join(__dirname, "../config/config.js"));

//Connect to Database

var connection = mysql.createConnection({
  host: config.host,
  user: config.user,
  password: config.password,
  database: config.database
});

console.log("Database Connected Successfully");
module.exports = connection;
