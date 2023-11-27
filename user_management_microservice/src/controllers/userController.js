// userController.js
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const axios = require('axios');
// Import the User model from your database schema file
const User = require('../models/user');

// Endpoint to create a new user
exports.createUser = async (req, res) => {
  try {

    //Get token from request header
    const userInfo= await getToken(req);
    // Extract the user data from the request body
    const { name, email, phoneNumber, address_line_1, address_line_2, city, postal_code } = req.body;
    const userId = userInfo.tokenid.id;
    // Create a new user using the User model
     const user = new User({ userId, name, email, phoneNumber, address_line_1, address_line_2, city, postal_code });

    // Save the user to the database
    await user.save();

    // Send a success response
    return res.status(201).json({ message: 'User created successfully', tokenId: userInfo.tokenid });
  } catch (error) {
    // Handle any errors and send an error response
    return res.status(500).json({ error: 'Failed to create user' });
  }
};

// Endpoint to get all users
//Requires authentication
exports.getAllUsers = async (req, res) => {
  try {
    //Get token from request header
    const isAdmin = await getIsAdmin(req);

    if(isAdmin){
    // Fetch all users from the database
    const users = await User.find();
    
    // Send the users as the response
    return res.json(users);
  } else{
    res.status(401).json({ error: 'Unauthorized' });
  }
  } catch (error) {
    // Handle any errors and send an error response
    res.status(500).json({ error: 'Failed to get users', error: error });
  }
}

// Auxiliar function to get the token from headers
const getIsAdmin = async (req) => {
  //Get token from request header
  const token = req.cookies?.token || req.headers['authorization'];

  const isAdmin = await axios.get('http://localhost:3001/auth/isAdmin', {
    headers: {
      'Authorization': token
    }
  })

  return isAdmin;
}


