//using Router, create the routes for the auth microservice
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController.js');
const { remotebuildexecution } = require('googleapis/build/src/apis/remotebuildexecution/index.js');

//Definition of the routes
/**
 * @swagger
 * /auth/signup:
 *   post:
 *     description: Create a user
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: Utilizador criado com sucesso
 *               user:
 *                 username: asd
 *                 password: $2b$10$/
 *                 email: asd@gmail.com
 *                 _id: 6564ef40350fc49346f6175c
 *                 created_at: '2023-11-27T19:34:24.893Z'
 *                 __v: 0
 *     tags:
 *       - Auth
 *     requestBody:
 *       description: User data for signup
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               email:
 *                 type: string
 *             required:
 *               - username
 *               - password
 *               - email
 */
router.post('/signup', authController.signup);

/**
 * @swagger
 * /auth/signin:
 *   get:
 *     description: Authenticate user and generate access token
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             example:
 *               message: O login foi bem sucedido
 *               token: "gA4p1yTTXwgHX3at_FIkbK4f2i7MFtLj-SREJXmYyeI"
 *     tags:
 *       - Auth
 *     requestBody:
 *       description: User credentials for login
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 */

router.get('/signin', authController.signin);

/**
 * @swagger
 * /auth/signout:
 *   post:
 *     description: Logout user
 *     responses:
 *       200:
 *         description: Logout successful
 *         content:
 *           application/json:
 *             example:
 *               message: Logout successful
 *     tags:
 *       - Auth
 *     security:
 *       - bearerAuth: []
 */
router.post('/signout', authController.signout);

/**
 * @swagger
 * /auth/isAdmin:
 *   get:
 *     description: check if the user is and admin
 *     responses:
 *       200:
 *         description: Successful response with boolean value true
 *         content:
 *           application/json:
 *             example:
 *               response: true
 *     tags:
 *       - Auth
 */
router.get('/isAdmin', authController.isAdmin);
//add a route to test the auth microservice
//this route can only be accessed by a logged in user

/**
 * @swagger
 * /auth/checktoken:
 *   get:
 *     description: Authenticate user and generate token
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             example:
 *               tokenid:
 *                 id: "6564eb4b9aea98e485d136e5"
 *                 role: "6564e90fdd8879a853993baa"
 *                 iat: 1701112697
 *                 exp: 1701199097
 *               message: O login foi bem sucedido
 *     tags:
 *       - Auth
 *     requestBody:
 *       description: User credentials for login
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 */
router.get('/checktoken', authController.checkToken);


/**
 * @swagger
 * /auth/getUserID:
 *   get:
 *     description: Get user ID
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               user_id: "6564eb4b9aea98e485d136e5"
 *     tags:
 *       - Auth
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: User credentials for login
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 */
router.get('/getUserEmail', authController.getUserEmail);

router.get('/getRole', authController.getRole);


router.get('/', authController.getAllUsers);
module.exports = router;
