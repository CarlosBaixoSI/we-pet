// user_management_microservice/src/routes/userRoutes.js
const express = require('express');
const router = express.Router();

// Import the userController module
const userController = require('../controllers/userController');

// Endpoint to create a new user
router.post('/user', userController.createUser);

// Endpoint to get all users
router.get('/getAll', userController.getAllUsers);

// ... other endpoints for updating, deleting, etc.

// Export the router
module.exports = router;
