//using Router, create the routes for the auth microservice
const express = require('express');
const router = express.Router();
const passwordController = require('../controllers/passwordController.js');

//Definition of the routes
router.post('/reset/request', passwordController.requestPasswordReset);
router.post('/reset/confirm', passwordController.confirmPasswordReset);
module.exports = router;
