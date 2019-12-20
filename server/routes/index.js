const express = require('express');
const router = express.Router();
const cors = require('cors');
const uploadImageToS3 = require('../helpers/uploadToS3');
var request = require('request');
var db = require('../../database/index.js');
var bodyParser = require('body-parser');
var _ = require('underscore');
const { check, validationResult } = require('express-validator');
const path = require('path');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get('/', (req, res) => {
  res.status(200).send('Home Page');
});
//users routes
//Route to get all users
router.get('/users', (req, res) => {
  var query = req.query.query;
  if (!query) {
    db.users.get(function(err, results) {
      if (results[0].length > 0) {
        res.json(formatUser(results));
      } else {
        res.json([]);
      }
    });
  } else {
    db.users.search(function(err, results) {
      console.log(results);
      if (results[0].length > 0) {
        res.json(formatUser(results));
      } else {
        res.json([]);
      }
    }, query);
  }
});
//Route to get user by id
router.get('/user/:id', (req, res) => {
  var id = req.params.id;
  db.users.getUserById(function(err, results) {
    if (results[0].length > 0) {
      console.log(formatUser(results));
      res.json(formatUser(results));
    } else {
      res.json([]);
    }
  }, id);
});
//Route to get user by email
router.get('/user/email/:email', (req, res) => {
  var email = req.params.email;
  db.users.getUserByEmail(function(err, results) {
    if (results[0].length > 0) {
      res.json(formatUser(results));
    } else {
      res.json({ success: false, message: 'User Not Found' });
    }
  }, email);
});
//Route to get user by name or part of name
router.get('/user/name/:name', (req, res) => {
  var name = req.params.name;
  db.users.getUserByName(function(err, results) {
    if (results[0].length > 0) {
      res.json(formatUser(results));
    } else {
      res.json({ success: false, message: 'User Not Found' });
    }
  }, name);
});

router.get('/user/skill/:userId', (req, res) => {
  var userId = req.params.userId;
  db.users.getUserSkills(function(err, results) {
    if (results[0].length > 0) {
      res.json(formatUser(results));
    } else {
      res.json({ success: false, message: 'User Not Found' });
    }
  }, userId);
});

//Route to insert new user into DB
//Need to be Revised
router.post('/user/login', (req, res) => {
  var fullName = req.body.fullName || req.body.username;
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
      console.log('user already exists');
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
router.post('/user/edit/basic', (req, res) => {
  console.log(req.body);
  var imgUrl = req.body.imgUrl || null;
  var bio = req.body.bio || null;
  var empStatus = req.body.empStatus || null;
  var userId = req.body.userId || null;
  var cohortId = req.body.cohortId || null;
  var fullName = req.body.fullName || null;
  //check if skills are array
  if (
    userId !== null &&
    cohortId != null &&
    fullName != null &&
    imgUrl !== null &&
    bio !== null &&
    empStatus !== null
  ) {
    db.users.editUserDetails(
      [userId, imgUrl, bio, empStatus, cohortId, fullName],
      function(err, dbUser) {
        res.json(formatUser(dbUser));
      }
    );
  }
});

// router.post("/user/edit/skill", (req, res) => {
//   console.log(req.body);
//   var userId = req.body.userId;
//   var skillId = req.body.skillId || [];
//   if (skillId !== null && skillId.length > 0) {
//     // axios.post(skillId).then(function(element) {
//     //   element.forEach(async skill => {
//     //     await db.users.addUserSkill([userId, skill], function(err, dbUser) {
//     //       console.log(skill);
//     //       res.json(formatUser(dbUser));
//     //     });
//     //   });
//     // });
//     //   asyncForEach(skillId, async element => {
//     //     await db.users.addUserSkill([userId, element], function(err, dbUser) {
//     //       console.log(element);
//     //       res.json(formatUser(dbUser));
//     //     });
//     //   });
//     try {
//       skillId.foreach(element => {
//         db.users.addUserSkill([userId, element], function(err, dbUser) {
//           //console.log(element);
//           //res.json(formatUser(dbUser));
//           console.log("Skill/s added Successfully");
//         });
//       });
//       db.users.getUserById(userId, function(err, dbUser) {
//         console.log("User", dbUser);
//         res.json(formatUser(dbUser));
//       });
//     } catch (err) {
//       // handle error
//     }
//   }
// });
router.post('/user/edit/skill', (req, res) => {
  console.log(req.body);
  var userId = req.body.userId;
  var skillId = req.body.skillId || [];
  if (skillId !== null && skillId.length > 0) {
    skillId.forEach((element) => {
      db.users.addUserSkill([userId, element], function(err, dbUser) {});
    });
    db.users.getUserById(function(err, results) {
      if (results[0].length > 0) {
        console.log(formatUser(results));
        res.json(formatUser(results));
      } else {
        res.json([]);
      }
    }, userId);
  }
});
// Route to edit user's contact info
router.post('/user/edit/contact', (req, res) => {
  var facebook = req.body.facebook || null;
  var twitter = req.body.twitter || null;
  var linkedin = req.body.linkedin || null;
  var github = req.body.github || null;
  var userId = req.body.userId || null;
  if (
    userId !== null &&
    facebook !== null &&
    github !== null &&
    twitter !== null &&
    linkedin !== null
  ) {
    db.users.editUserSM([userId, facebook, twitter, linkedin, github], function(
      err,
      dbUser
    ) {
      res.json(formatUser(dbUser));
    });
  }
});
//Route to edit user's portfolio

router.post('/user/edit/portfolio', (req, res) => {
  console.log(req.body);
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
      console.log('inserted successfully');

      res.json(dbProject);
    });
  }
});

//Route to delete project from user portfolio
router.post('/userProject/delete', (req, res) => {
  var projectId = req.body.projectId;
  var userId = req.body.userId;
  if (projectId !== null && userId !== null) {
    db.users.deleteUserProject([userId, projectId], function(err, skill) {
      if (skill.length > 0) {
        console.log('Project deleted successfully');
      }
      res.send('Project deleted successfully');
    });
  }
});
//cohorts routes
//Route to get all cohorts data
router.get('/cohorts', (req, res) => {
  db.cohorts.get(function(err, results) {
    res.json(results);
  });
});

//Route to get all users by cohort
router.get('/cohortUsers/:cohort', (req, res) => {
  var cohort = req.params.cohort;
  db.cohorts.getCohortUsers(function(err, results) {
    res.json(formatUser(results));
  }, cohort);
});

//skills
//Route to get all skills lists
router.get('/skills', (req, res) => {
  db.skills.get(function(err, results) {
    res.json(results);
  });
});
//Route to get all users who have a skill
router.get('/skillUsers/:skill', (req, res) => {
  var skill = req.params.skill;
  db.cohorts.getCohortUsers(function(err, results) {
    res.json(results);
  }, skill);
});

//Route to delete a user skill
router.post('/skillUsers/delete', (req, res) => {
  var skillId = req.body.skill;
  var userId = req.body.userId;
  if (skillId !== null && userId !== null) {
    db.users.deleteUserSkill([userId, skillId], function(err, skill) {
      if (skill.length > 0) {
        console.log('Skill deleted successfully');
      }
      res.send('Skill deleted successfully');
    });
  }
});

//Employment Status functions

//Route to get all employment status
router.get('/empStatus', (req, res) => {
  db.empStatus.get(function(err, results) {
    res.json(results);
  });
});
//Route to get users by employment status
router.get('/empStatus/:empStat', (req, res) => {
  var empStat = req.params.empStat;
  db.empStatus.getUsersByEmpStatus(function(err, results) {
    res.json(results);
  }, empStat);
});

//Portfolio functions
//Route to get all user's projects
router.get('/portfolio/:userId', (req, res) => {
  var userId = req.params.userId;
  db.portfolio.get(function(err, results) {
    res.json(results);
  }, userId);
});
//Route to get all user projects using full name or part of it
router.get('/portfolio/user/:userName', (req, res) => {
  var userName = req.params.userName;
  db.portfolio.getProjectsByUName(function(err, results) {
    res.json(results);
  }, userName);
});
//Route to get project by id
router.get('/project/:projectId', (req, res) => {
  var projectId = req.params.projectId;
  db.portfolio.getProjectById(function(err, results) {
    res.json(results);
  }, projectId);
});

//posts functions
//Route to get all posts
router.get('/posts', (req, res) => {
  var query = req.query.query;
  if (!query) {
    db.posts.get(function(err, results) {
      res.json(formatPost(results));
    });
  } else {
    db.posts.search(function(err, results) {
      if (results[0].length > 0) {
        console.log(results);
        res.json(formatPost(results));
      } else {
        res.json([]);
      }
    }, query);
  }
});
//Route to get posts by a specific user
router.get('/user/posts/:userName', (req, res) => {
  var userName = req.params.userName;
  db.posts.getPostsByUser(function(err, results) {
    res.json(results);
  }, userName);
});
//Route to get all posts by users in a specific cohort
router.get('/user/posts/cohort/:cohort', (req, res) => {
  var cohort = req.params.cohort;
  db.posts.getPostsByCohort(function(err, results) {
    res.json(results);
  }, cohort);
});
//Route to get all posts by post's type
router.get('/user/posts/type/:type', (req, res) => {
  var type = req.params.type;
  db.posts.getPostsByType(function(err, results) {
    res.json(results);
  }, type);
});
//Route to get all posts by text in its body
router.get('/user/posts/body/:text', (req, res) => {
  var text = req.params.text;
  db.posts.getPostsByBody(function(err, results) {
    res.json(results);
  }, text);
});
//Route to add a post
router.post('/uploadImage', uploadImageToS3.uploadImageToS3);
router.post('/user/post/add', (req, res) => {
  console.log(req.body);
  const data = req.body;
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
router.post('/user/post/delete', (req, res) => {
  var postId = req.body.postId;
  if (postId !== null) {
    db.post.deletePost([postId], function(err, skill) {
      if (skill.length > 0) {
        console.log('Post deleted successfully');
      }
      res.send('Post deleted successfully');
    });
  }
});
// router.getConstants("/constants", (req, res) => {
//   var skills =
// });

let formatUser = function(results) {
  var users = [];
  var ids = [];
  var skills = [];
  var projects = [];
  if (results !== undefined) {
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
      user.cohortId = results[0][i].cohortId;
      user.empStat = results[0][i].empStat;
      user.epmId = results[0][i].empId;

      var skillId = results[0][i].skillId;
      var skill = {};
      skill.skillId = skillId;
      skill.skillName = results[0][i].skillName;
      if (_.findWhere(skills, skill) == null && skillId !== null) {
        skills.push(skill);
      }
      user.skills = skills;

      var projectId = results[0][i].projectId;
      var project = {};
      project.projectId = projectId;
      project.projectTitle = results[0][i].projectTitle;
      project.projectLink = results[0][i].projectLink;
      project.projectDesc = results[0][i].projectDesc;
      if (_.findWhere(projects, project) == null && projectId !== null) {
        projects.push(project);
      }
      user.projects = projects;

      //console.log(user);
      if (!ids.includes(user.userId)) {
        users.push(user);
        ids.push(user.userId);
      }
    }
  }

  //console.log(results[0].length);
  return users;
};
let formatPost = function(results) {
  console.log(results[0].length);
  var posts = [];
  var comments = [];
  for (var i = 0; i < results[0].length; i++) {
    var post = {};
    post.userId = results[0][i].userId;
    post.fullName = results[0][i].fullName;
    post.username = results[0][i].username;
    post.imgUrl = results[0][i].imgUrl;
    post.email = results[0][i].email;
    post.createdAt = results[0][i].createdAt;
    post.postId = results[0][i].postId;
    post.postBody = results[0][i].postBody;
    post.postType = results[0][i].postType;
    post.createdAt = results[0][i].createdAt;

    var commentId = results[0][i].commentId;
    var comment = {};
    comment.commentId = commentId;
    comment.commentBody = results[0][i].commentBody;
    comment.cTime = results[0][i].cTime;
    comment.userId = results[0][i].cUserId;
    comment.cUserName = results[0][i].cUserName;
    comment.cFullName = results[0][i].cFullName;
    comment.cImgUrl = results[0][i].cImgUrl;
    comment.cPostId = results[0][i].cPostId;
    let ids = [];
    if (_.findWhere(comments, comment) == null && commentId !== null) {
      comments.push(comment);
    }
    if (post.postId === comment.cPostId) {
      post.comments = comments;
    } else {
      post.comments = [];
    }
    ids = [];
    if (!ids.includes(post.postId)) {
      posts.push(post);
      ids.push(post.postId);
    }
  }
  return posts;
};

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

module.exports = router;
