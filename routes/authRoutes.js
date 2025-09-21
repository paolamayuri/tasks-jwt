const { Router } = require('express');
const router = Router();
const authController = require('../controllers/authController');

router.get('/register', authController.renderRegisterPage);
router.post('/register', authController.registerUser);
router.get('/login', authController.renderLoginPage);
router.post('/login', authController.loginUser);
router.get('/logout', authController.logoutUser);

module.exports = router;