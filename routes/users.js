var express = require('express');
var router = express.Router();
const userController = require('../controller/user/userController');
const verifyToken = require('../controller/authController')
const taskController = require('../controller/task/taskController')



/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.post('/register', userController.register)
router.post('/confirmation', userController.confirmation)
router.post('/login', userController.login)
router.post('/profile', verifyToken, userController.profile)
router.post('/editProfile', verifyToken, userController.editProfile)
router.post('/home', verifyToken, userController.home)

/*** Add Lat Lng After Singup ***/
router.post('/addLatLng', verifyToken, userController.addLatLng)
router.post('/chatSupport', verifyToken, userController.chatSupport)

/*** Tasks */
router.post('/addTask', verifyToken, taskController.addtask);
router.post('/deleteTask', verifyToken, taskController.deletetask)
router.post('/allTask', verifyToken, taskController.alltask)
router.post('/taskView', verifyToken, taskController.taskview)
router.post('/taskActionList', verifyToken, taskController.taskactionlist)
router.post('/acceptRequest', verifyToken, taskController.acceptRequest)
router.post('/declineRequest', verifyToken, taskController.declineRequest)
router.post('/actionRequest', verifyToken, taskController.actionRequest)



module.exports = router;
