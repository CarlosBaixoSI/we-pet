const express = require("express");
const {
    getAllUsers,
    createUser,
    getUserByID,
    updateUser,
    deleteUser
} = require("../controllers/userController");

/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: API endpoints for managing users
 *
 * /users:
 *   get:
 *     tags: [Users]
 *     summary: Get all users
 *     description: Retrieve a list of all users.
 *     responses:
 *       200:
 *         description: A list of users.
 *   post:
 *     tags: [Users]
 *     summary: Create a new user
 *     description: Create a new user.
 *     responses:
 *       200:
 *         description: The created user.
 *
 * /users/{id}:
 *   get:
 *     tags: [Users]
 *     summary: Get user by ID
 *     description: Retrieve a user by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: user ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The retrieved user.
 *   put:
 *     tags: [Users]
 *     summary: Update user
 *     description: Update an existing user.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: user ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The updated user.
 *   delete:
 *     tags: [Users]
 *     summary: Delete user
 *     description: Delete user.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: user ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The deleted user.
 */
const router = express.Router();

router.route("/").get(getAllUsers).post(createUser);
router.route("/:id").get(getUserByID).put(updateUser).delete(deleteUser);

module.exports = router;
