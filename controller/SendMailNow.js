const nodemailer = require("nodemailer");
var transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
      user: 'admin@example.com',
      pass: 'admin'
  }
});

module.exports = {
  registerMail: function(mailOptions) {
    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        return console.log(error);
      }
      console.log("Mail sent: " + info.response);
    });
  }
};

