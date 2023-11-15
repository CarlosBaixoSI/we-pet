// userController.js

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Import the User model from your database schema file
const User = require('./models/User');

// Endpoint to create a new user
router.post('/users', async (req, res) => {
  try {
    // Extract the user data from the request body
    const { name, email, password } = req.body;

    // Create a new user using the User model
    const user = new User({ name, email, password });

    // Save the user to the database
    await user.save();

    // Send a success response
    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    // Handle any errors and send an error response
    res.status(500).json({ error: 'Failed to create user' });
  }
});

// Endpoint to get all users
router.get('/users', async (req, res) => {
  try {
    // Fetch all users from the database
    const users = await User.find();

    // Send the users as the response
    res.json(users);
  } catch (error) {
    // Handle any errors and send an error response
    res.status(500).json({ error: 'Failed to get users' });
  }
});

// ... other endpoints for updating, deleting, etc.

// Export the router
module.exports = router;