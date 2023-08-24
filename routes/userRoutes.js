const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticationMiddleware = require('../middlewares/authenticationMiddleware');

router.post('/signup', userController.createUser);
router.put('/users/:id', authenticationMiddleware.authenticate, userController.updateUser);
router.delete('/users/:id', authenticationMiddleware.authenticate, userController.deleteUser);
router.post('/forgot-password', userController.forgotPassword);

module.exports = router;