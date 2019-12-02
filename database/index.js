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
  //users functions
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
    getUserById: function(callback, userId) {
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
    getUserByName: function(callback, name) {
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
  },
  //cohorts functions
  cohorts: {
    //get all cohorts data
    get: function(callback) {
      connection.query("call `rbk-space`.getCohorts()", function(err, results) {
        if (err) {
          console.log("Can not fetch data", err);
        } else {
          callback(err, results);
        }
      });
    },
    //get all users by a specified cohort
    getCohortUsers: function(callback, cohort) {
      connection.query("call `rbk-space`.getCohortUsers(?)", cohort, function(
        err,
        results
      ) {
        if (err) {
          console.log("Can not fetch data", err);
        } else {
          callback(err, results);
        }
      });
    }
  },
  //skills function
  skills: {
    get: function(callback) {
      connection.query("call `rbk-space`.getSkills()", function(err, results) {
        if (err) {
          console.log("Can not fetch data", err);
        } else {
          callback(err, results);
        }
      });
    },
    getSkillUsers: function(callback, skill) {
      connection.query("call `rbk-space`.getUserBySkill(?)", skill, function(
        err,
        results
      ) {
        if (err) {
          console.log("Can not fetch data", err);
        } else {
          callback(err, results);
        }
      });
    }
  }
};
