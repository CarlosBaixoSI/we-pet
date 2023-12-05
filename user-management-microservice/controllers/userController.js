const userService = require("../services/userService");

/**
 * Retrieves all users.
 * @param {Object} req - The request object
 * @param {Object} res -  The response object
 */
exports.getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.json({ data: users, status: "Success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

/**
 * Creates a new user
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @returns {Promise<void>} - A promise that resolves when the user is created
 */
exports.createUser = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    res.json({ data: user, status: "Success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

/**
 *
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
exports.getUserByID = async (req, res) => {
  try {
    const user = await userService.getUserByID(req.params.id);
    res.json({ data: user, status: "Success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

/**
 *
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @returns {Promise<void>} - A promise that resolves when the user is updated
 */
exports.updateUser = async (req, res) => {
  try {
    await userService.updateUser(req.params.id, req.body);
    const user = await userService.getUserByID(req.params.id);
    res.json({ data: user, status: "Success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

/**
 *
 * @param {*} req - The request object
 * @param {*} res - The response object
 * @returns {Promise<void>} - Returns the deleted user
 */
exports.deleteUser = async (req, res) => {
  try {
    const deleted_user = await userService.getUserByID(req.params.id);
    await userService.deleteUser(req.params.id);
    res.json({data: deleted_user, status: "Successfully deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}