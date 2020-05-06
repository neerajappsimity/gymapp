var express = require('express');
var router = express.Router();
const userController = require('../controller/user/userController');
const verifyToken = require('../controller/authController')



/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.post('/register', userController.register)
router.post('/confirmation', userController.confirmation)
router.post('/login', userController.login);


module.exports = router;
