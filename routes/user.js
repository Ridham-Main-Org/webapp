const express = require('express');
const router = express.Router();
const userController = require('../controllers/usercontroller');
const verifyToken = require('../auth');

router.post('/', userController.createUser);
router.get('/self', verifyToken, userController.getUser);
router.put('/self', verifyToken, userController.updateUser);

module.exports = router;
