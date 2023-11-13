//Implementation of the authController
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const mongoose = require("mongoose");
const apiResponses = require("../assets/i18n/apiResponses");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;

exports.signup = async (req, res) => {
  const newUser = new User(req.body);

  newUser.password = await bcrypt.hash(newUser.password, 10);

  try {
    //save the user
    const user = await newUser.save();

    res
      .status(apiResponses.signupSuccessfull.code)
      .json({ message: apiResponses.signupSuccessfull.message, user: user });
  } catch (error) {
    console.log(error);
    console.log(error.code)
    if(error.code === 11000){  //mongo error for duplicate key
      if(error.keyPattern.username){
        return res.status(apiResponses.usernameAlreadyUsed.code).json({message: apiResponses.usernameAlreadyUsed.message});
      }
      else if(error.keyPattern.email){
        return res.status(apiResponses.emailAlreadyUsed.code).json({message: apiResponses.emailAlreadyUsed.message});
      }

    }
    return res.status(apiResponses.signupFailed.code).json({message: apiResponses.signupFailed.message + ': ' + error.errors[Object.keys(error.errors)[0]].message});

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
      .json({ message: i18n.__(apiResponses.invalidCredentials.message) });
  }

    //compare the password with the hashed password
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if(!isPasswordValid)
    {
        return res.status(apiResponses.invalidCredentials.code).json({message: apiResponses.invalidCredentials.message});
    }

    //create the token
    const token = jwt.sign({id: user._id}, JWT_SECRET, {expiresIn: 86400});

    //store the token in the cookie
    res.cookie("token", token, {httpOnly: true, maxAge: 86400});

    return res.status(apiResponses.loginSuccessfull.code).json({message: apiResponses.loginSuccessfull.message, token: token});
};

exports.signout = (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(apiResponses.logoutSuccessfull.code).json({message: apiResponses.logoutSuccessfull.message});
  } catch (error) {
    return res.status(apiResponses.logoutFailed.code).json({message: apiResponses.logoutFailed.message + ': ' + error});
  }

}

