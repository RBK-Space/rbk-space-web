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
//Route to get all users
router.get("/users", (req, res) => {
  db.users.get(function(err, results) {
    res.json(results);
  });
});

router.get("/user/id=1", (req, res) => {
  db.users.getUserById(function(err, results) {
    res.json(results);
  });
});

router.get("/user/name=Fay", (req, res) => {
  db.users.getUserByName(function(err, results) {
    res.json(results);
  });
});
module.exports = router;
