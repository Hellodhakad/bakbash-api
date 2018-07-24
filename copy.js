var express = require("express");
var app = express();
var mongoose = require("mongoose");
var bodyParser = require('body-parser');
var sha1 = require('sha1');
var http = require("http");
var jwt = require('jsonwebtoken');
var sendmailnow = require('./models/sendmailnow.js');
var msg91 = require('./models/msg91');
var bcrypt = require('bcryptjs');
const SendOtp = require('sendotp');
const sendOtp = new SendOtp('161409AHGt40y9y594ceb76');
const port = process.env.PORT || 5000;

mongoose.connect("mongodb://admin:admin123@ds141274.mlab.com:41274/api");
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log("Connection Successful!");
});

//middlewares
app.use(bodyParser.urlencoded({ 'extended': 'true' }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/dist'));

//user schema for guide
var UserSchema = new mongoose.Schema({
  aadhar: {
    type: Number,
    required: true
  },
  fname: {
    type: String,
    required: true
  },
  lname: {
    type: String,
    required: true
  },
  dob: {
    type: Date,
    required: true
  },
  phone: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  pincode: {
    type: Number,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});
var User = mongoose.model('User', UserSchema);


//routes for signup 
app.post('/signup', function (req, res) {
  var userData = new User(req.body);
  User.find({
    aadhaar: req.body.aadhaar,
    email: req.body.email,
    phone: req.body.phone
  }, function (err, user) {
    if (err) {
      console.log("error while checking database");
      res.status(400);
    }
    console.log(user);
    phone = req.body.phone;
    sendOtp.send(phone, "SIGNUP", function (err, data) {
      if (err) {
        console.log("error while sending otp");
      } else {
        console.log(data);
      }
    });
    userData.save().then(item => {
      sendmailnow.registermail(req.body.email);
      res.send("item saved to database");
    })
      .catch(err => {
        res.status(400).send("unable to save to database user exist in database");
      });
  })
});


//Login route
app.post('/login', function (req, res) {
  console.log('user ', req.body.phone, req.body.password, ' requesting login');
  if (req.body.aadhar && req.body.password) {
      var aadhar = req.body.aadhar;
      var password = req.body.password;
      User.findOne({
          aadhar: aadhar,
          password: password
      }, function (err, user) {
          if (err) {
              console.log('error in authenticating user:', err);
          } else {
              if (user) {
                  if(err){
                      console.log("error while fetcching user");
                      res.json({success:false, data:"error while fetcching user"})
                  }else{
                      if(user.password == sha1(password)){
                          console.log("authenticate user");
                          user.password= "";
                          res.json({success:true, data:user})
                      }else{
                          console.log("wrong password");
                          res.json({success:false, data:'wrong password'});
                      }
                  }
              } else {
                  console.log('user not found ');
                  res.json({ success: false, data: 'no user found' });
              }
          }
      });
  }
});



var server = app.listen(port, function () {
  console.log(`server is listening on : ${port}`);
});
