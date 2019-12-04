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
    },
    //Add new user on login
    addUser: function(callback, fullName, username, github, imgUrl) {
      connection.query(
        "call `rbk-space`. `addUser`(?, ?, ?, ?, ?, ?)",
        fullName,
        username,
        github,
        imgUrl,
        function(err, results) {
          if (err) {
            console.log("Can not insert user", err);
          } else {
            callback(err, results);
          }
        }
      );
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
  },
  //Employment Status functions
  empStatus: {
    get: function(callback) {
      connection.query("call `rbk-space`.getEmpStatus()", function(
        err,
        results
      ) {
        if (err) {
          console.log("Can not fetch data", err);
        } else {
          callback(err, results);
        }
      });
    },
    getUsersByEmpStatus: function(callback, empStatus) {
      connection.query(
        "call `rbk-space`.getUsersByEmpStat(?)",
        empStatus,
        function(err, results) {
          if (err) {
            console.log("Can not fetch data", err);
          } else {
            callback(err, results);
          }
        }
      );
    }
  },
  //Projects and Portfolio Functions
  //get all user's projects depending on userId
  portfolio: {
    get: function(callback, userId) {
      connection.query("call `rbk-space`.getProjects(?)", userId, function(
        err,
        results
      ) {
        if (err) {
          console.log("Can not fetch data", err);
        } else {
          callback(err, results);
        }
      });
    },
    //get all user's projects using any part of user name
    getProjectsByUName: function(callback, userName) {
      connection.query(
        "call `rbk-space`.getUserProjects(?)",
        userName,
        function(err, results) {
          if (err) {
            console.log("Can not fetch data", err);
          } else {
            callback(err, results);
          }
        }
      );
    },
    //get a project by its id
    getProjectById: function(callback, id) {
      connection.query("call `rbk-space`.getProjectById(?)", id, function(
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

  //Posts functions
  //get all posts
  posts: {
    get: function(callback) {
      connection.query("call `rbk-space`.getPosts()", function(err, results) {
        if (err) {
          console.log("Can not fetch data", err);
        } else {
          callback(err, results);
        }
      });
    },
    //get all posts for a specific user
    getPostsByUser: function(callback, userName) {
      connection.query("call `rbk-space`.getPostsByUser(?)", userName, function(
        err,
        results
      ) {
        if (err) {
          console.log("Can not fetch data", err);
        } else {
          callback(err, results);
        }
      });
    },
    // get all posts published by users in a specific user
    getPostsByCohort: function(callback, cohort) {
      connection.query("call `rbk-space`.getPostsByCohort(?)", cohort, function(
        err,
        results
      ) {
        if (err) {
          console.log("Can not fetch data", err);
        } else {
          callback(err, results);
        }
      });
    },
    //get all posts by a post type (e.g. all text posts)
    getPostsByType: function(callback, type) {
      connection.query("call `rbk-space`.getPostsByType(?)", type, function(
        err,
        results
      ) {
        if (err) {
          console.log("Can not fetch data", err);
        } else {
          callback(err, results);
        }
      });
    },
    //get all posts containing a text in their/ its body
    getPostsByBody: function(callback, text) {
      connection.query("call `rbk-space`.getPostsByBody(?)", text, function(
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
