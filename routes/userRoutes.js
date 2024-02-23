const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/register", userController.registerUser);

router.post("/login", userController.loginUser);

// Retrieve user profile information
// router.get('/profile', authenticateToken, userController.getUserProfile);

module.exports = router;
