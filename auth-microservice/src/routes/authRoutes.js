//using Router, create the routes for the auth microservice
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController.js');

//Definition of the routes
router.post('/signup', authController.signup);
router.get('/signin', authController.signin);
router.post('/signout', authController.signout);

//add a route to test the auth microservice
//this route can only be accessed by a logged in user
router.get('/checktoken', authController.checkToken);
module.exports = router;
