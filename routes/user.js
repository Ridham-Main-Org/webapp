const express = require('express');
const router = express.Router();
const userController = require('../controllers/usercontroller');
const verifyToken = require('../auth');
const verifycontroller = require('../controllers/verifycontroller');

router.post('/', userController.createUser);
router.get('/self', verifyToken, userController.getUser);
router.put('/self', verifyToken, userController.updateUser);
router.get('/verify', verifycontroller.isUserVerified);

module.exports = router;
