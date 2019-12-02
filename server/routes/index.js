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
module.exports = router;
