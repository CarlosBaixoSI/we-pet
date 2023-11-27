//Implementation of the authController
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const mongoose = require("mongoose");
const apiResponses = require("../assets/i18n/apiResponses");
const RoleModel = require("../models/role");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;

exports.signup = async (req, res) => {
  const newUser = new User(req.body);

  newUser.password = await bcrypt.hash(newUser.password, 10);

  newUser.role = await getUserRole(newUser);
  console.log(newUser.role)
  try {
    //save the user
    const user = await newUser.save();

    res
      .status(apiResponses.signupSuccessfull.code)
      .json({ message: apiResponses.signupSuccessfull.message, user: user });
  } catch (error) {
    if (error.code === 11000) {
      //mongo error for duplicate key
      if (error.keyPattern.username) {
        return res
          .status(apiResponses.usernameAlreadyUsed.code)
          .json({ message: apiResponses.usernameAlreadyUsed.message });
      } else if (error.keyPattern.email) {
        return res
          .status(apiResponses.emailAlreadyUsed.code)
          .json({ message: apiResponses.emailAlreadyUsed.message });
      }
    }
    return res.status(apiResponses.signupFailed.code).json({
      message:
        apiResponses.signupFailed.message +
        ": " +
        error.errors[Object.keys(error.errors)[0]].message,
    });
  }
};

exports.signin = async (req, res) => {
  //Username can be both the password or email
  const { username, password } = req.body;

  //try to find the user by username or email
  const user = await User.findOne({
    $or: [{ username: username }, { email: username }],
  });

  if (!user) {
    return res
      .status(apiResponses.invalidCredentials.code)
      .json({ message: apiResponses.invalidCredentials.message });
  }

  //compare the password with the hashed password
  const isPasswordValid = bcrypt.compareSync(password, user.password);
  if (!isPasswordValid) {
    return res
      .status(apiResponses.invalidCredentials.code)
      .json({ message: apiResponses.invalidCredentials.message });
  }

  //create the token
  const token = jwt.sign({ user_id: user._id, role_id: user.role }, JWT_SECRET, {
    expiresIn: 86400,
  });

  //store the token in the cookie
  res.cookie("token", token, { httpOnly: true, maxAge: 86400 });

  return res
    .status(apiResponses.loginSuccessfull.code)
    .json({ message: apiResponses.loginSuccessfull.message, token: token });
};

exports.signout = (req, res) => {
  try {
    res.clearCookie("token");
    return res
      .status(apiResponses.logoutSuccessfull.code)
      .json({ message: apiResponses.logoutSuccessfull.message });
  } catch (error) {
    return res
      .status(apiResponses.logoutFailed.code)
      .json({ message: apiResponses.logoutFailed.message + ": " + error });
  }
};

//add a route to test the auth microservice
//this route can only be accessed by a logged in user
exports.checkToken = (req, res) => {
  let token = req.cookies?.token || req.headers["authorization"];

  if (!token) {
    return res
      .status(apiResponses.notAuthenticated.code)
      .json({ message: apiResponses.notAuthenticated.message });
  }

  //If token has 'Bearer', remove it
  if (token.startsWith("Bearer ")) {
    token = token.slice(7, token.length);
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    let response = { userId: decoded.id, role: decoded.role };

    return res.status(200).json(response);
  } catch (error) {
    return res
      .status(apiResponses.notAuthenticated.code)
      .json({ message: "Error parsing your token" + ": " + error });
  }
};

exports.isAdmin = async (req, res) => {
  let token = req.cookies?.token || req.headers["authorization"];

  if (!token) {
    return res
      .status(apiResponses.notAuthenticated.code)
      .json({ message: apiResponses.notAuthenticated.message });
  }

  //If token has 'Bearer', remove it
  if (token.startsWith("Bearer ")) {
    token = token.slice(7, token.length);
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const role = await RoleModel.findOne({ _id: decoded.role });

    if (role.name == "admin") {
      return res.status(200).json(true);
    } else {
      return res.status(200).json(false);
    }
  } catch (error) {
    return res
      .status(apiResponses.notAuthenticated.code)
      .json({ message: "Error parsing your token" + ": " + error });
  }
};

//Aux Functions
async function getUserRole(user) {
  if (
    user.email === "carlosbaixo.si@gmail.com" ||
    user.email === "carlosbeiramar@gmail.com" ||
    user.email == "joaojcms.lol@gmail.com"
  ) {
    const adminRole = await RoleModel.findOne({ name: "admin" });
    console.log('admin role', adminRole)
    return adminRole._id;
  } 
    const userRole = await role.findOne({ name: "user" });
    return userRole._id;
  
}
