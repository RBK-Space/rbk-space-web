var mysql = require("mysql");
// const config = require("../config/config");

//Connect to Database using the global configuration

var connection;

function handleDisconnect() {
  connection = mysql.createConnection({
    host: global.gConfig.host,
    user: global.gConfig.user,
    password: global.gConfig.password,
    database: global.gConfig.database
  });

  connection.connect(function(err) {
    // The server is either down
    if (err) {
      // or restarting (takes a while sometimes).
      console.log("error when connecting to db:", err);
      setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
    } // to avoid a hot loop, and to allow our node script to
  }); // process asynchronous requests in the meantime.
  // If you're also serving http, display a 503 error.
  connection.on("error", function(err) {
    console.log("db error", err);
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      // Connection to the MySQL server is usually
      handleDisconnect(); // lost due to either server restart, or a
    } else {
      // connnection idle timeout (the wait_timeout
      throw err; // server variable configures this)
    }
  });
}

handleDisconnect();
var someVal = [];
var setValue = function(value) {
  someVal = value;
};

module.exports = connection;
module.exports = {
  //users functions
  users: {
    // get all users data
    get: function(callback) {
      connection.query("call getUsers()", function(err, results) {
        if (err) {
          console.log("Can not fetch users", err);
        } else {
          // console.log(rows);
          callback(err, results);
        }
      });
    },
    //search users
    search: function(callback, query) {
      try {
        connection.query("call searchUser(?)", query, function(err, results) {
          if (err) {
            console.log("Can not fetch user", err);
          } else {
            callback(err, results);
          }
        });
      } catch (err) {
        console.log("err ", err);
      }
    },
    getUserById: function(callback, userId) {
      connection.query(" call getUserById(?)", userId, function(err, results) {
        if (err) {
          console.log("Can not fetch user", err);
        } else {
          callback(err, results);
        }
      });
    },
    getUserByName: function(callback, name) {
      connection.query(" call getUserByName(?)", name, function(err, results) {
        if (err) {
          console.log("Can not fetch user", err);
        } else {
          callback(err, results);
        }
      });
    },
    //get user by email
    getUserByEmail: function(callback, email) {
      connection.query(" call getUserByEmail(?)", email, function(
        err,
        results
      ) {
        if (err) {
          console.log("Can not fetch user", err);
        } else {
          setValue(results[0]);
          callback(err, results[0]);
          return someVal;
        }
      });
    },
    //Add new user on login
    addUser: function(x, callback) {
      connection.query(" call  `addUser`(?, ?, ?, ?, ?, ?)", x, function(
        err,
        results
      ) {
        if (err) {
          console.log("Can not insert user", err);
        } else {
          console.log("Added Successfully");
          //console.log(someVal);
          callback(err, results[0]);
        }
      });
    },
    editUserImg: function(x, callback) {
      connection.query(" call editUserImg(?, ?) ", x, function(err, results) {
        if (err) {
          console.log("Can not insert user", err);
        } else {
          console.log("Added Successfully");
          //console.log(someVal);
          callback(err, results[0]);
        }
      });
    },

    editUserBio: function(x, callback) {
      connection.query(" call editUserBio(?, ?) ", x, function(err, results) {
        if (err) {
          console.log("Can not edit user", err);
        } else {
          callback(err, results[0]);
        }
      });
    },
    editUserEmpStatus: function(x, callback) {
      connection.query(" call editUserEmpStatus(?, ?) ", x, function(
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
      connection.query(" call addUserSkill(?, ?) ", x, function(err, results) {
        if (err) {
          console.log("Can not edit user", err);
        } else {
          callback(err, results);
        }
      });
    },
    deleteUserSkill: function(x, callback) {
      connection.query(" call deleteUserSkill(?, ?) ", x, function(
        err,
        results
      ) {
        if (err) {
          console.log("Can not delete user", err);
        } else {
          callback(err, results);
        }
      });
    },
    editFacebook: function(x, callback) {
      connection.query(" call editFacebook(?, ?)", x, function(err, results) {
        if (err) {
          console.log("Can not edit user", err);
        } else {
          callback(err, results[0]);
        }
      });
    },
    editTwitter: function(x, callback) {
      connection.query(" call editTwitter(?, ?)", x, function(err, results) {
        if (err) {
          console.log("Can not edit user", err);
        } else {
          callback(err, results[0]);
        }
      });
    },
    editLinkedin: function(x, callback) {
      connection.query(" call editLinkedin(?, ?)", x, function(err, results) {
        if (err) {
          console.log("Can not edit user", err);
        } else {
          callback(err, results[0]);
        }
      });
    },
    addUserProject: function(x, callback) {
      connection.query(" call adduserProject(?, ?, ?, ?)", x, function(
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
    deleteUserProject: function(x, callback) {
      connection.query("call deleteProject(?, ?)", x, function(err, results) {
        if (err) {
          console.log("Can not edit user", err);
        } else {
          callback(err, results[0]);
        }
      });
    },
    deleteUserProject: function(x, callback) {
      connection.query("call deleteProject(?, ?)", x, function(err, results) {
        if (err) {
          console.log("Can not edit user", err);
        } else {
          callback(err, results[0]);
        }
      });
    }
  },
  //cohorts functions
  cohorts: {
    //get all cohorts data
    get: function(callback) {
      connection.query(" call getCohorts()", function(err, results) {
        if (err) {
          console.log("Can not fetch data", err);
        } else {
          callback(err, results);
        }
      });
    },
    //get all users by a specified cohort
    getCohortUsers: function(callback, cohort) {
      connection.query(" call getCohortUsers(?)", cohort, function(
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
      connection.query(" call getSkills()", function(err, results) {
        if (err) {
          console.log("Can not fetch data", err);
        } else {
          callback(err, results);
        }
      });
    },
    getSkillUsers: function(callback, skill) {
      connection.query(" call getUserBySkill(?)", skill, function(
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
      connection.query(" call getEmpStatus()", function(err, results) {
        if (err) {
          console.log("Can not fetch data", err);
        } else {
          callback(err, results);
        }
      });
    },
    getUsersByEmpStatus: function(callback, empStatus) {
      connection.query(" call getUsersByEmpStat(?)", empStatus, function(
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
  //Projects and Portfolio Functions
  //get all user's projects depending on userId
  portfolio: {
    get: function(callback, userId) {
      connection.query(" call getProjects(?)", userId, function(err, results) {
        if (err) {
          console.log("Can not fetch data", err);
        } else {
          callback(err, results);
        }
      });
    },
    //get all user's projects using any part of user name
    getProjectsByUName: function(callback, userName) {
      connection.query(" call getUserProjects(?)", userName, function(
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
    //get a project by its id
    getProjectById: function(callback, id) {
      connection.query(" call getProjectById(?)", id, function(err, results) {
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
      connection.query(" call getPosts()", function(err, results) {
        if (err) {
          console.log("Can not fetch data", err);
        } else {
          callback(err, results);
        }
      });
    },
    //get all posts for a specific user
    getPostsByUser: function(callback, userName) {
      connection.query(" call getPostsByUser(?)", userName, function(
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
    //search posts
    search: function(callback, query) {
      try {
        connection.query("call searchPost(?)", query, function(err, results) {
          if (err) {
            console.log("Can not fetch post", err);
          } else {
            callback(err, results);
          }
        });
      } catch (err) {
        console.log("err ", err);
      }
    },
    // get all posts published by users in a specific user
    getPostsByCohort: function(callback, cohort) {
      connection.query(" call getPostsByCohort(?)", cohort, function(
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
      connection.query(" call getPostsByType(?)", type, function(err, results) {
        if (err) {
          console.log("Can not fetch data", err);
        } else {
          callback(err, results);
        }
      });
    },
    //get all posts containing a text in their/ its body
    getPostsByBody: function(callback, text) {
      connection.query(" call getPostsByBody(?)", text, function(err, results) {
        if (err) {
          console.log("Can not fetch data", err);
        } else {
          callback(err, results);
        }
      });
    },
    addPost: function(x, callback) {
      //console.log(callback);
      connection.query(" call addPost(?, ?, ?)", x, (err, results) => {
        if (err) {
          console.log("Can not fetch data", err);
        } else {
          callback(null, results[0]);
        }
      });
    },
    deletePost: function(x, callback) {
      connection.query(" call deletePost(?)", x, function(err, results) {
        if (err) {
          console.log("Can not delete post", err);
        } else {
          callback(null, results[0]);
        }
      });
    }
  }
};
