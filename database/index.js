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
    //get user by email
    getUserByEmail: function(callback, email) {
      connection.query("call `rbk-space`.getUserByEmail(?)", email, function(
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
    addUser: function(x, callback) {
      connection.query(
        "call `rbk-space`. `addUser`(?, ?, ?, ?, ?, ?)",
        x,
        function(err, results) {
          if (err) {
            console.log("Can not insert user", err);
          } else {
            console.log("Added Successfully");
            callback(err, results[0]);
          }
        }
      );
    },
    editUserImg: function(x, callback) {
      connection.query("call `rbk-space`.editUserImg(?, ?) ", x, function(
        err,
        results
      ) {
        if (err) {
          console.log("Can not edit user", err);
        } else {
          callback(err, results[0]);
        }
      });
    },
    editUserBio: function(x, callback) {
      connection.query("call `rbk-space`.editUserBio(?, ?) ", x, function(
        err,
        results
      ) {
        if (err) {
          console.log("Can not edit user", err);
        } else {
          callback(err, results[0]);
        }
      });
    },
    editUserEmpStatus: function(x, callback) {
      connection.query("call `rbk-space`.editUserEmpStatus(?, ?) ", x, function(
        err,
        results
      ) {
        if (err) {
          console.log("Can not edit user", err);
        } else {
          callback(err, results[0]);
        }
      });
    },
    addUserSkill: function(x, callback) {
      connection.query("call `rbk-space`.addUserSkill(?, ?) ", x, function(
        err,
        results
      ) {
        if (err) {
          console.log("Can not edit user", err);
        } else {
          callback(err, results);
        }
      });
    },
    editFacebook: function(x, callback) {
      connection.query("call `rbk-space`.editFacebook(?, ?)", x, function(
        err,
        results
      ) {
        if (err) {
          console.log("Can not edit user", err);
        } else {
          callback(err, results[0]);
        }
      });
    },
    editTwitter: function(x, callback) {
      connection.query("call `rbk-space`.editTwitter(?, ?)", x, function(
        err,
        results
      ) {
        if (err) {
          console.log("Can not edit user", err);
        } else {
          callback(err, results[0]);
        }
      });
    },
    editLinkedin: function(x, callback) {
      connection.query("call `rbk-space`.editLinkedin(?, ?)", x, function(
        err,
        results
      ) {
        if (err) {
          console.log("Can not edit user", err);
        } else {
          callback(err, results[0]);
        }
      });
    },
    addUserProject: function(x, callback) {
      connection.query(
        "call `rbk-space`.adduserProject(?, ?, ?, ?)",
        x,
        function(err, results) {
          if (err) {
            console.log("Can not edit user", err);
          } else {
            callback(err, results[0]);
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
    },
    addPost: function(x, callback) {
      //console.log(callback);
      connection.query(
        "call `rbk-space`.addPost(?, ?, ?)",
        x,
        (err, results) => {
          if (err) {
            console.log("Can not fetch data", err);
          } else {
            callback(null, results[0]);
          }
        }
      );
    }
  }
};
