/*Project: Node Scratch
 * Author: Bibekananda Jana
 * 
 * 
 * */

var express = require('express');
var router = express.Router();
var authController = require('../controllers/auth/authController');
var models = require('../models');
var passport = require('passport');
var bcrypt = require('bcrypt-nodejs');
var csrf = require('csurf');
var csrfProtection = csrf({ cookie: true });





router.get('/',function(req, res) {
  res.send('respond with a resource');
});
router.get('/signin', csrfProtection,authController.signinview);
router.post('/signin', authController.signin);
router.post('/signup', authController.signup);



module.exports = router;
