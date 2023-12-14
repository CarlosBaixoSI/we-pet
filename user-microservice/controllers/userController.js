const userService = require("../services/userService");
const axios = require("axios");
const gatewayPort = process.env.GATEWAY_PORT || 3000;

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

exports.createUserByID = async (req, res) => {
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
    let token = req.cookies?.token || req.headers["authorization"];
    try {
      const user_info = await axios.get(`http://localhost:${gatewayPort}/auth/getUserEmail`, {
        headers: {
          'authorization': token
        }
      });
      try{
        await userService.updateUser(user_info.data.email, req.body);
        const user = await userService.getUserByEmail(user_info.data.email);
        res.json({ data: user, status: "Success" });
      }catch{
        res.status(500).json({ error: "Failed to update the user" });
      }
    }catch (err) {
      res.status(500).json({ error: "Failed to update the user" });
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
