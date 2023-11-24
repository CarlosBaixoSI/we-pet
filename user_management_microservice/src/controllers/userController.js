// userController.js
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const axios = require('axios');
// Import the User model from your database schema file
const User = require('../models/user');

// Endpoint to create a new user
module.exports.createUser = async (req, res) => {
  try {
    // Extract the user data from the request body
    const { user_id, name, email, phoneNumber, address_line_1, address_line_2, city, postal_code } = req.body;

    // Create a new user using the User model
    const user = new User({ user_id, name, email, phoneNumber, address_line_1, address_line_2, city, postal_code });

    // Save the user to the database
    await user.save();

    // Send a success response
    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    // Handle any errors and send an error response
    res.status(500).json({ error: 'Failed to create user' });
  }
};

// Endpoint to get all users
//Requires authentication
exports.getAllUsers = async (req, res) => {
  try {

    //Get token from request header
    const token = req.cookies?.token || req.headers['authorization'];

    const userInfo = await axios.get('http://localhost:3001/auth/checkToken', {
      headers: {
        'Authorization': token
      }
    })
    
    console.log(userInfo.data);
    // Fetch all users from the database
    const users = await User.find();

    // Send the users as the response
    res.json(users);
  } catch (error) {
    // Handle any errors and send an error response
    res.status(500).json({ error: 'Failed to get users' });
  }
}

// ... other endpoints for updating, deleting, etc.

