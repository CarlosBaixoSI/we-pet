const mongoose = require("mongoose");
const apiResponses = require("../assets/i18n/apiResponses");
const User = require("../models/User");
const mailService = require("../services/nodemailer/nodemailerService");
const bcrypt = require("bcrypt");

exports.requestPasswordReset = async (req, res) => {
  const { username } = req.body;

  //try to find the user by username or email
  const user = await User.findOne({
    $or: [{ username: username }, { email: username }],
  });

  if (!user) {
    return res
      .status(apiResponses.invalidCredentials.code)
      .json({ message: apiResponses.invalidCredentials.message });
  }

  //if the user exists, send an email with a link to reset the password
  //generate a random token with 6 characters separated by -
  const token = Math.random()
    .toString(36)
    .substring(2, 6)
    .match(/.{1,3}/g)
    .join("-");

  mailService.sendEmail(
    user.email,
    "Password Reset",
    "Here is your token to reset password: " + token
  );

  //save the token in the database
  user.resetPasswordToken = token;
  user.resetPasswordExpires = Date.now() + 3600000; //1 hour

  try {
    await user.save();
    return res.status(200).json({ message: "Email sent", token: token });
  } catch (error) {
    console.log(error);
    return res
      .status(apiResponses.internalServerError.code)
      .json({ message: apiResponses.internalServerError.message });
  }
};

exports.confirmPasswordReset = async (req, res) => {
  const { username, token, newPassword } = req.body;

  //try to find the user by username or email
  const user = await User.findOne({
    $or: [{ username: username }, { email: username }],
  });

  if (!user) {
    return res
      .status(apiResponses.invalidCredentials.code)
      .json({ message: apiResponses.invalidCredentials.message });
  }

  //check if the token is valid
  if (user.resetPasswordToken !== token) {
    return res
      .status(apiResponses.invalidPasswordResetToken.code)
      .json({ message: apiResponses.invalidPasswordResetToken.message });
  }

  if(user.resetPasswordExpires < Date.now()){
    return res
    .status(apiResponses.passwordResetTokenExpired.code)
    .json({ message: apiResponses.passwordResetTokenExpired.message });
  }

    //if the token is valid, update the password
    user.password = bcrypt.hashSync(newPassword, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    try {
        await user.save();
        return res.status(apiResponses.passwordResetSuccessful.code).json({message: apiResponses.passwordResetSuccessful.message});
    } catch (error) {
        console.log(error);
        return res.status(apiResponses.internalServerError.code).json({message: apiResponses.internalServerError.message});
    }
};
