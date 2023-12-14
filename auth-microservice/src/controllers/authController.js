const authService = require("../services/AuthService");
const apiResponses = require("../assets/i18n/apiResponses");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const axios = require("axios");
const gatewayPort = process.env.GATEWAY_PORT;
exports.signup = async (req, res) => {
  try {
    const userId = await authService.signUp(req.body);
    try {
      await axios.post(
        `http://localhost:${gatewayPort}/users/${req.body.user_id}`,
        {
          name: req.body.name,
          email: req.body.email,
        }
      );
    } catch {
      return res.status(400).json({ error: "Failed creating user" });
    }
    return res.json({ data: userId });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.signin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const token = await authService.signIn(username, password);
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 864000,
      expires: new Date(Date.now() + 864000),
    });
    return res.status(200).json({ data: token, message: "Login successful" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.signout = (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Logout failed" + ": " + error.message });
  }
};

//add a route to test the auth microservice
//this route can only be accessed by a logged in user
exports.checkToken = async (req, res) => {
  let token = req.cookies?.token || req.headers["authorization"];
  try {
    const decodedToken = await authService.checkToken(token);

    if (!decodedToken) {
      return res
        .status(apiResponses.notAuthenticated.code)
        .json({ message: apiResponses.notAuthenticated.message });
    }
    return res.status(200).json(decodedToken);
  } catch (error) {
    return res
      .status(apiResponses.notAuthenticated.code)
      .json({ message: "Error parsing your token" + ": " + error });
  }
};

exports.getUserEmail = async (req, res) => {
  let encryptedToken = req.cookies?.token || req.headers["authorization"];

  try {
    if (encryptedToken.startsWith("Bearer ")) {
      encryptedToken = encryptedToken.slice(7, encryptedToken.length);
    }

    try {
      const decoded = jwt.verify(encryptedToken, JWT_SECRET);
      let user_info = { userId: decoded.user_id, roleId: decoded.role_id };
      try {

        const user = await authService.getUserById(user_info.userId);
        return res.status(200).json({ email: user.email, message: "Success" });
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    } catch (error) {
      return null;
    }
  } catch (error) {
    return res
      .status(apiResponses.notAuthenticated.code)
      .json({ message: "Error parsing your token" + ": " + error });
  }
};

exports.getRole = async (req, res) => {

  let encryptedToken = req.cookies?.token || req.headers["authorization"];

  try {
    if (encryptedToken.startsWith("Bearer ")) {
      encryptedToken = encryptedToken.slice(7, encryptedToken.length);
    }
    const decoded = jwt.verify(encryptedToken, JWT_SECRET);
    let user_info = { userId: decoded.user_id, roleId: decoded.role_id };
    try {
      const role = await authService.getRole(user_info.roleId);
      console.log(role)
      return res.status(200).json({ role: role.name, message: "Success" });
    }catch (error) {
      return res.status(500).json({ error: error.message });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

exports.isAdmin = async (req, res) => {
  let token = req.cookies?.token || req.headers["authorization"];
  try {
    const isAdmin = await authService.isAdmin(token);
    return res.status(200).json({ data: isAdmin, message: "Success" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await authService.getAllUsers();
    return res.status(200).json({ data: users, message: "Success" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await authService.getUserById(req.params.id);
    return res.status(200).json({ data: user, message: "Success" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await authService.deleteUser(req.params.id);
    return res.status(200).json({ data: user, message: "Success" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
