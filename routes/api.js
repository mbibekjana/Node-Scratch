/*Project: Node Scratch
 * Author: Bibekananda Jana
 * 
 * 
 * */

var express = require('express');
var router = express.Router();
var user_controller = require('../controllers/api/apiController');
router.get('/', user_controller.index);
router.post('/login', user_controller.login);
router.get('/userdetails', user_controller.userdetails);
router.get('/user', function (req, res) {
  res.send('welcome test user')
})


module.exports = router;
