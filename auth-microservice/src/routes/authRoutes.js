//using Router, create the routes for the auth microservice
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController.js');

//Definition of the routes
/**
 * @swagger
 * /auth/signup:
 *   post:
 *     description: Create an user
 *     responses:
 *       200:
 *         description: Successful response
 */
router.post('/signup', authController.signup);

/**
 * @swagger
 * /auth/signin:
 *   get:
 *     description: Get the token needed to login
 *     responses:
 *       200:
 *         description: Successful response
 */
router.get('/signin', authController.signin);

/**
 * @swagger
 * /auth/signout:
 *   post:
 *     description: Log out the user
 *     responses:
 *       200:
 *         description: Successful response
 */
router.post('/signout', authController.signout);

//add a route to test the auth microservice
//this route can only be accessed by a logged in user

/**
 * @swagger
 * /auth/checktoken:
 *   get:
 *     description: Check if the token is correct
 *     responses:
 *       200:
 *         description: Successful response
 */
router.get('/checktoken', authController.checkToken);
module.exports = router;
