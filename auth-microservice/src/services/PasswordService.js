const User = require("../models/user");
const mailService = require("../services/nodemailer/nodemailerService");
const bcrypt = require("bcrypt");

exports.requestPasswordReset = async (username) => {
  const user = await User.findOne({
    $or: [{ username: username }, { email: username }],
  });

  if (!user) {
    throw new Error("Invalid credentials");
  }

  //generate a random token with 4 numbers
  const token = Math.random().toString(36).substring(2, 6);

  await mailService.sendEmail(
    user.email,
    "Password Reset",
    "Here is your token to reset password: " + token
  );

  user.resetPasswordToken = token;
  user.resetPasswordExpires = Date.now() + 3600000; //1 hour

  try {
    const result = await User.findByIdAndUpdate(user._id, user);
    return { user: user._id.toString(), resetPasswordToken: token };
  } catch (error) {
    throw new Error(error);
  }
};

exports.confirmPasswordReset = async (
  username,
  resetPasswordToken,
  newPassword
) => {
  const user = await User.findOne({
    $or: [{ username: username }, { email: username }],
  });

  if (!user) {
    throw new Error("Invalid credentials");
  }

  //check if the token is valid
  if (user.resetPasswordToken !== resetPasswordToken) {
    throw new Error("Invalid token");
  }

  if (user.resetPasswordExpires < Date.now()) {
    throw new Error("Token expired");
  }

  //if the token is valid, update the password
  user.password = bcrypt.hashSync(newPassword, 10);
  user.resetPasswordToken = "";
  user.resetPasswordExpires = null;

  try {
    const result = await User.findByIdAndUpdate(user._id, user);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};
