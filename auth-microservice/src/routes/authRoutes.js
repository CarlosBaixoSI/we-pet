//using Router, create the routes for the auth microservice
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController.js');

//Definition of the routes
router.post('/signup', authController.signup);
router.get('/signin', authController.signin);
router.post('/signout', authController.signout);
module.exports = router;
