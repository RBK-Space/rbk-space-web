const nodemailer = require('nodemailer');
const config = require('../../config/config');

module.exports = function sendEmail(userEmail) {
  let transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    secure: false,
    auth: {
      user: global.gConfig.rbkEmail,
      pass: global.gConfig.rbkEmailPassword
    }
  });

  const message = {
    from: 'rbk.space1@gmail.com',
    to: userEmail,
    subject: 'Welcome to RBK Space',
    html: `<img src="https://myammanlife.files.wordpress.com/2017/10/rbk-jordan-hacking.png?w=748" alt="rbk">
    <h1 style ="font-family:Helvetica; color:black;"> Weclome to RBK Space! </h1>
    
    <h3 style ="font-family:Helvetica; color:black;"> You are now part of a community that connects all current students and graduates across all the world! Share your skills,memories and post/find jobs! </h3>
    
    <h3 style ="font-family:Helvetica; color:black;"> please take a few minutes to complete your profile information <a href="#">from here</a>.
      </h3>`
  };
  transport.sendMail(message, function(err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
};
