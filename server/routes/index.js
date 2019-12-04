const express = require("express");
const router = express.Router();
var request = require("request");
var db = require("../../database/index.js");
var bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get("/", (req, res) => {
  res.status(200).send("Home Page");
});
//users routes
//Route to get all users
router.get("/users", (req, res) => {
  db.users.get(function(err, results) {
    res.json(results);
  });
});
//Route to get user by id
router.get("/user/:id", (req, res) => {
  var id = req.params.id;
  db.users.getUserById(function(err, results) {
    res.json(results);
  }, id);
});
//Route to get user by name or part of name
router.get("/user/:name", (req, res) => {
  var name = req.params.name;
  db.users.getUserByName(function(err, results) {
    res.json(results);
  }, name);
});
//Route to insert new user into DB
//Need to be Revised
router.post("/user/login", (req, res) => {
  var fullName = req.body.fullName;
  var username = req.body.username;
  var github = req.body.github;
  var imgUrl = req.body.imgUrl;
  db.users.addUser(
    fullName,
    username,
    github,
    imgUrl
      .then(function(dbUser) {
        //After creating the user successfully, return it back to the client
        res.json(dbUser);
      })
      .catch(function(err) {
        res.json(err);
      })
  );
});
// Route to edit user's basic info
router.post("/user/edit/basic", (req, res) => {});
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
    res.json(results);
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
  db.posts.get(function(err, results) {
    res.json(results);
  });
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
module.exports = router;
