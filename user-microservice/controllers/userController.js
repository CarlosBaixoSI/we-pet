const userService = require("../services/userService");
const axios = require("axios");
const gatewayPort = process.env.GATEWAY_PORT || 3000;
const jwt = require("jsonwebtoken");


function get_user_info_from_token(token) {
  if (token.startsWith("Bearer ")) {
    token = token.slice(7, token.length);
  }
  const decoded = jwt.verify(token, JWT_SECRET);
  return { userId: decoded.user_id, roleId: decoded.role_id };
}

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
 * Creates a user by ID.
 *
 * @param {Object} req - The request object.
 * @param {Object} req.body - The request body containing user data.
 * @param {Object} res - The response object.
 * @returns {Object} The response JSON object containing the created user and status.
 * @throws {Error} If there is an error creating the user.
 */
exports.createUserByID = async (req, res) => {
    try{
      const role_info = await axios.get(
        `http://localhost:${gatewayPort}/auth/getRole`,{
          headers: {
            authorization: req.headers.authorization
          }
        }
      );
      if (role_info.data.role === "admin"){
        const user = await userService.createUser(req.body);
        res.json({ data: user, status: "Success" });
      }
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
    const role_info = await axios.get(
      `http://localhost:${gatewayPort}/auth/getRole`,{
        headers: {
          authorization: req.headers.authorization
        }
      }
    );
    if (role_info.data.role === "admin"){
      const user = await userService.getUserByID(req.params.id);
      return res.json({ data: user, status: "Success" });
    }else if (role_info.data.role === "user"){
      const user_info = get_user_info_from_token(req.headers.authorization);
      const user = await userService.getUserByID(user_info.userId);
      return res.json({ data: user, status: "Success" });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
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
    const role_info = await axios.get(
      `http://localhost:${gatewayPort}/auth/getRole`,{
        headers: {
          authorization: req.headers.authorization
        }
      }
    );
    if (role_info.data.role === "admin"){
      const deleted_user = await userService.getUserByID(req.params.id);
      // delete user also form the auth microservice
      axios.delete(
        `http://localhost:${gatewayPort}/auth/deleteUserByEmail/${deleted_user.email}`,
      )
      await userService.deleteUser(req.params.id);
      res.json({data: deleted_user, status: "Successfully deleted" });
    }else if (role_info.data.role === "user"){
      try{
        let user_info = get_user_info_from_token(req.headers.authorization);
        const deleted_user = await getUserByID(req.params.id);
        // delete user also form the auth microservice
        await axios.delete(
          `http://localhost:${gatewayPort}/auth/deleteUser/${user_info.userId}`,
        )
        await userService.deleteUser(user_info.userId);
        res.json({data: deleted_user, status: "Successfully deleted" });
      }catch{
        res.status(500).json({ error: "Failed to decode the token" });
      }
      res.status(500).json({ error: "Failed to delete the user" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


/**
 * Get user ID by email.
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
exports.getUserIDByEmail = async (req, res) => {
  const { email } = req.query;
  try {
    const userID = await userService.getUserIDByEmail(email);
    res.json({ data: userID, status: "Success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
