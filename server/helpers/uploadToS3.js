const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const uuid = require('uuid/v4');
const fetch = require('node-fetch');
aws.config.update({
  accessKeyId: 'AKIAJASNVLXKPNNIV6YQ',
  secretAccessKey: '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',
  region: 'eu-central-1'
});
const s3 = new aws.S3();

var upload = multer({
  storage: multerS3({
    s3,
    bucket: 'rbk-space',
    metadata: function(req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function(req, file, cb) {
      cb(null, req.s3Key);
    }
  })
});

const singleFileUpload = upload.single('image');

function uploadToS3(req, res) {
  req.s3Key = uuid();
  let downloadURL = `https://s3-eu-central-1.amazonaws.com/rbk-space/${req.s3Key}`;
  return new Promise((resolve, reject) => {
    return singleFileUpload(req, res, err => {
      if (err) reject(err);
      else {
        return resolve(downloadURL);
      }
    });
  });
}
module.exports = {
  uploadImageToS3: (req, res) => {
    uploadToS3(req, res)
      .then(downloadURL => {
        //TODO: save to DB
        fetch('http://localhost:4000/auth/login/success', {
          method: 'GET',
          credentials: 'include',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials': true
          }
        }).then(user => {
          console.log(user.user);
        });

        return res.status(200).send({ downloadURL });
      })
      .catch(err => {
        console.log(err);
      });
  }
};
