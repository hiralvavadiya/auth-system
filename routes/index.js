var express = require('express');
var router = express.Router();
var user = require('../controller/controller');
const { login, logout } = require('../controller/authController');
var admin = require('../controller/authController');
var auth = require('../middleware/auth');
// const nodemailer = require('nodemailer');

const multer = require('multer');

// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images');
  },
  filename: function (req, file, cb){
    cb(null, file.originalname);
  }
});

// Create the multer instance
const upload = multer({ storage: storage });

// Import the Nodemailer library
const nodemailer = require('nodemailer');

// Create a transporter object
const transporter = nodemailer.createTransport({
  host: 'live.smtp.mailtrap.io',
  port: 587,
  secure: false, // use SSL
  auth: {
    user: '1a2b3c4d5e6f7g',
    pass: '1a2b3c4d5e6f7g',
  }
});

// Configure the mailoptions object
const mailOptions = {
  from: 'thisishiralvavadiya@gmail.com',
  to: 'rushikanani014@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

// Send the email
transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log('Error:', error);
  } else {
    console.log('Email sent:', info.response);
  }
});

/* GET home page. */
router.post('/',upload.single('images'),user.index);
router.get('/',auth.check_token,user.find_data);
router.post('/login',admin.login);
router.get('/logout',admin.logout);
router.post('/cat',user.cat_insert);
router.get('/cat',user.cat_get_data);

module.exports = router;