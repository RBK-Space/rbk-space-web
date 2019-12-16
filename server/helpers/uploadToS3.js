const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const db = require('../../database/index');
const config = require('../../config/config');

aws.config.update({
  accessKeyId: global.gConfig.AWSaccessKeyId,
  secretAccessKey: global.gConfig.AWSsecretAccessKey,
  region: global.gConfig.AWSregion
});
const s3 = new aws.S3();

//use multer to handel multipart object comming from the client
var upload = multer({
  storage: multerS3({
    s3,
    bucket: global.gConfig.AWSBucket,
    metadata: function(req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function(req, file, cb) {
      cb(null, file.originalname);
    }
  })
});

const singleFileUpload = upload.single('image');

function uploadToS3(req, res) {
  return new Promise((resolve, reject) => {
    return singleFileUpload(req, res, err => {
      const downloadURL = res.req.file.location;
      const { user } = req.body;
      if (err) reject(err);
      else {
        return resolve({ downloadURL, user });
      }
    });
  });
}
module.exports = {
  uploadImageToS3: (req, res) => {
    uploadToS3(req, res)
      .then((downloadURL, user) => {
        db.posts.addPost(
          ['1', downloadURL.downloadURL, downloadURL.user],
          function(err, result) {
            console.log('image added done');
          }
        );
        return res.status(200).send({ downloadURL, user });
      })
      .catch(err => {
        console.log(err);
      });
  }
};
