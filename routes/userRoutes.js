
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Register a new user
router.post('/register', userController.registerUser);

// Authenticate and log in a user
router.post('/login', userController.loginUser);

// Retrieve user profile information
// router.get('/profile', authenticateToken, userController.getUserProfile);

module.exports = router;
