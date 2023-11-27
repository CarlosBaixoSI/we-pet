//using Router, create the routes for the auth microservice
const express = require('express');
const router = express.Router();
const passwordController = require('../controllers/passwordController.js');

//Definition of the routes
/**
 * @swagger
 * /auth/reset/request:
 *   post:
 *     description: Reset password
 *     responses:
 *       200:
 *         description: Email sent successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Email sent
 *               token: "dx6-s"
 *     tags:
 *       - Auth
 *     requestBody:
 *       description: Email data for sending
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               recipient:
 *                 type: string
 *                 format: email
 *             required:
 *               - recipient
 */
router.post('/reset/request', passwordController.requestPasswordReset);

/**
 * @swagger
 * /auth/reset/confirm:
 *   post:
 *     description: Reset user password
 *     responses:
 *       200:
 *         description: Password reset successful
 *         content:
 *           application/json:
 *             example:
 *               message: Password reset successful
 *     tags:
 *       - Auth
 *     requestBody:
 *       description: User data for password reset
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *             required:
 *               - email
 */

router.post('/reset/confirm', passwordController.confirmPasswordReset);
module.exports = router;
