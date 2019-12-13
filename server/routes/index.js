const express = require("express");
const router = express.Router();
const cors = require("cors");
var request = require("request");
var db = require("../../database/index.js");
var bodyParser = require("body-parser");
var _ = require("underscore");

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get("/", (req, res) => {
  res.status(200).send("Home Page");
});
//users routes
//Route to get all users
router.get("/users", (req, res) => {
  var query = req.query.query;
  if (!query) {
    db.users.get(function(err, results) {
      if (results[0].length > 0) {
        res.json(formatUser(results));
      } else {
        res.json({ success: false, message: "User Not Found" });
      }
    });
  } else {
    db.users.search(function(err, results) {
      console.log(results);
      if (results[0].length > 0) {
        res.json(formatUser(results));
      } else {
        res.json({ success: "User Not Found" });
      }
    }, query);
  }
});
//Route to get user by id
router.get("/user/:id", (req, res) => {
  var id = req.params.id;
  db.users.getUserById(function(err, results) {
    if (results[0].length > 0) {
      res.json(formatUser(results));
    } else {
      res.json({ success: "User Not Found" });
    }
  }, id);
});
//Route to get user by email
router.get("/user/email/:email", (req, res) => {
  var email = req.params.email;
  db.users.getUserByEmail(function(err, results) {
    if (results[0].length > 0) {
      res.json(formatUser(results));
    } else {
      res.json({ success: "User Not Found" });
    }
  }, email);
});
//Route to get user by name or part of name
router.get("/user/name/:name", (req, res) => {
  var name = req.params.name;
  db.users.getUserByName(function(err, results) {
    if (results[0].length > 0) {
      res.json(formatUser(results));
    } else {
      res.json({ success: "User Not Found" });
    }
  }, name);
});

router.get("/user/skill/:userId", (req, res) => {
  var userId = req.params.userId;
  db.users.getUserSkills(function(err, results) {
    if (results[0].length > 0) {
      res.json(formatUser(results));
    } else {
      res.json({ success: "User Not Found" });
    }
  }, userId);
});

//Route to insert new user into DB
//Need to be Revised
router.post("/user/login", (req, res) => {
  var fullName = req.body.fullName;
  var username = req.body.username;
  var github = req.body.github;
  var imgUrl = req.body.imgUrl;
  var email = req.body.email;
  var token = req.body.token;
  var user = {};
  db.users.getUserByEmail(function(err, results) {
    if (results.length > 0) {
      //Home page
      user = results[0];
      console.log(results[0]);
      console.log("user already exists");
      res.json(formatUser(user));
    } else {
      db.users.addUser(
        [fullName, username, email, token, github, imgUrl],
        function(err, dbUser) {
          res.json(dbUser[0]);
        }
      );
    }
  }, email);
});

// Route to edit user's basic info
router.post("/user/edit/basic", (req, res) => {
  var imgUrl = req.body.imgUrl || null;
  var bio = req.body.bio || null;
  var empStatus = req.body.empStatus || null;
  var userId = req.body.userId || null;
  //check if skills are array
  var skillId = req.body.skillId || null;
  if (imgUrl !== null) {
    db.users.editUserImg([userId, imgUrl], function(err, dbUser) {
      res.json(dbUser);
    });
  }
  if (bio !== null) {
    db.users.editUserBio([userId, bio], function(err, dbUser) {
      res.json(dbUser);
    });
  }
  if (empStatus !== null) {
    db.users.editUserEmpStatus([userId, empStatus], function(err, dbUser) {
      res.json(dbUser);
    });
  }
  if (userId !== null && skillId !== null) {
    db.users.addUserSkill([userId, skillId], function(err, dbUser) {
      res.json(dbUser);
    });
  }
});
// Route to edit user's contact info
router.post("/user/edit/contact", (req, res) => {
  var facebook = req.body.facebook || null;
  var twitter = req.body.twitter || null;
  var linkedin = req.body.linkedin || null;
  var userId = req.body.userId || null;
  if (facebook !== null) {
    db.users.editFacebook([userId, facebook], function(err, dbUser) {
      res.json(dbUser);
    });
  }
  if (twitter !== null) {
    db.users.editTwitter([userId, twitter], function(err, dbUser) {
      res.json(dbUser);
    });
  }
  if (linkedin !== null) {
    db.users.editLinkedin([userId, linkedin], function(err, dbUser) {
      res.json(dbUser);
    });
  }
});
//Route to edit user's portfolio

router.post("/user/edit/portfolio", (req, res) => {
  var title = req.body.title;
  var link = req.body.link;
  var description = req.body.description;
  var userId = req.body.userId || null;
  if (
    title !== null &&
    link !== null &&
    description !== null &&
    userId !== null
  ) {
    db.users.addUserProject([userId, title, link, description], function(
      err,
      dbProject
    ) {
      console.log("inserted successfully");

      res.json(dbProject);
    });
  }
});

//Route to delete project from user portfolio
router.post("/userProject/delete", (req, res) => {
  var projectId = req.body.projectId;
  var userId = req.body.userId;
  if (projectId !== null && userId !== null) {
    db.users.deleteUserProject([userId, projectId], function(err, skill) {
      if (skill.length > 0) {
        console.log("Project deleted successfully");
      }
      res.send("Project deleted successfully");
    });
  }
});
//cohorts routes
//Route to get all cohorts data
router.get("/cohorts", (req, res) => {
  db.cohorts.get(function(err, results) {
    res.json(results);
  });
});

//Route to get all users by cohort
router.get("/cohortUsers/:cohort", (req, res) => {
  var cohort = req.params.cohort;
  db.cohorts.getCohortUsers(function(err, results) {
    res.json(formatUser(results));
  }, cohort);
});

//skills
//Route to get all skills lists
router.get("/skills", (req, res) => {
  db.skills.get(function(err, results) {
    res.json(results);
  });
});
//Route to get all users who have a skill
router.get("/skillUsers/:skill", (req, res) => {
  var skill = req.params.skill;
  db.cohorts.getCohortUsers(function(err, results) {
    res.json(results);
  }, skill);
});

//Route to delete a user skill
router.post("/skillUsers/delete", (req, res) => {
  var skillId = req.body.skill;
  var userId = req.body.userId;
  if (skillId !== null && userId !== null) {
    db.users.deleteUserSkill([userId, skillId], function(err, skill) {
      if (skill.length > 0) {
        console.log("Skill deleted successfully");
      }
      res.send("Skill deleted successfully");
    });
  }
});

//Employment Status functions

//Route to get all employment status
router.get("/empStatus", (req, res) => {
  db.empStatus.get(function(err, results) {
    res.json(results);
  });
});
//Route to get users by employment status
router.get("/empStatus/:empStat", (req, res) => {
  var empStat = req.params.empStat;
  db.empStatus.getUsersByEmpStatus(function(err, results) {
    res.json(results);
  }, empStat);
});

//Portfolio functions
//Route to get all user's projects
router.get("/portfolio/:userId", (req, res) => {
  var userId = req.params.userId;
  db.portfolio.get(function(err, results) {
    res.json(results);
  }, userId);
});
//Route to get all user projects using full name or part of it
router.get("/portfolio/user/:userName", (req, res) => {
  var userName = req.params.userName;
  db.portfolio.getProjectsByUName(function(err, results) {
    res.json(results);
  }, userName);
});
//Route to get project by id
router.get("/project/:projectId", (req, res) => {
  var projectId = req.params.projectId;
  db.portfolio.getProjectById(function(err, results) {
    res.json(results);
  }, projectId);
});

//posts functions
//Route to get all posts
router.get("/posts", (req, res) => {
  var query = req.query.query;
  console.log(query);
  if (!query) {
    db.posts.get(function(err, results) {
      res.json(results);
    });
  } else {
    console.log(query);
    db.posts.search(function(err, results) {
      console.log(results);
      res.json(results);
    }, query);
  }
});
//Route to get posts by a specific user
router.get("/user/posts/:userName", (req, res) => {
  var userName = req.params.userName;
  db.posts.getPostsByUser(function(err, results) {
    res.json(results);
  }, userName);
});
//Route to get all posts by users in a specific cohort
router.get("/user/posts/cohort/:cohort", (req, res) => {
  var cohort = req.params.cohort;
  db.posts.getPostsByCohort(function(err, results) {
    res.json(results);
  }, cohort);
});
//Route to get all posts by post's type
router.get("/user/posts/type/:type", (req, res) => {
  var type = req.params.type;
  db.posts.getPostsByType(function(err, results) {
    res.json(results);
  }, type);
});
//Route to get all posts by text in its body
router.get("/user/posts/body/:text", (req, res) => {
  var text = req.params.text;
  db.posts.getPostsByBody(function(err, results) {
    res.json(results);
  }, text);
});
//Route to add a post
router.post("/user/post/add", (req, res) => {
  const { data } = req.body;
  var postType = data.postType;
  var postBody = data.postBody;
  var userId = data.userId;
  if (postType !== null && postBody !== null && userId !== null) {
    db.posts.addPost([postType, postBody, userId], function(err, results) {
      res.send(results);
    });
  }
});
//Route to delete a post
router.post("/user/post/delete", (req, res) => {
  var postId = req.body.postId;
  if (postId !== null) {
    db.post.deletePost([postId], function(err, skill) {
      if (skill.length > 0) {
        console.log("Post deleted successfully");
      }
      res.send("Post deleted successfully");
    });
  }
});

formatUser = function(results) {
  var users = [];
  var ids = [];
  for (var i = 0; i < results[0].length; i++) {
    var user = {};
    user.userId = results[0][i].userId;
    user.fullName = results[0][i].fullName;
    user.username = results[0][i].username;
    user.image = results[0][i].image;
    user.email = results[0][i].email;
    user.bio = results[0][i].bio;
    user.fb = results[0][i].fb;
    user.gh = results[0][i].gh;
    user.li = results[0][i].li;
    user.tw = results[0][i].tw;
    user.cohort = results[0][i].cohort;
    user.empStat = results[0][i].empStat;
    var skills = [];
    var skillId = results[0][i].skillId;
    var skill = {};
    skill.skillId = skillId;
    skill.skillName = results[0][i].skillName;
    if (_.findWhere(skills, skill) == null) {
      skills.push(skill);
    }
    user.skills = skills;
    var projects = [];
    var projectId = results[0][i].projectId;
    var project = {};
    project.projectId = projectId;
    project.projectTitle = results[0][i].projectTitle;
    project.projectLink = results[0][i].projectLink;
    project.projectDesc = results[0][i].projectDesc;
    if (_.findWhere(projects, project) == null) {
      projects.push(project);
    }
    user.projects = projects;
    console.log(users);

    //console.log(user);
    if (!ids.includes(user.userId)) {
      users.push(user);
      ids.push(user.userId)
    }
  }
  //console.log(results[0].length);
  return users;
};
getUserSkills = function(userId) {
  return new Promise(function(resolve, reject) {
    db.users.getUserSkills(function(err, results) {
      if (results === undefined) {
        reject(new Error("Error resuls is undefined"));
      } else {
        resolve(results);
      }
    }, userId);
  });
};

module.exports = router;
