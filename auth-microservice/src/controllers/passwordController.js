const passwordService = require("../services/PasswordService");

exports.requestPasswordReset = async (req, res) => {
  const { username } = req.body;

  try {
    const result = await passwordService.requestPasswordReset(username);
    return res.status(200).json({ message: "Email sent", data: result });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.confirmPasswordReset = async (req, res) => {
  const { username, token, newPassword } = req.body;

  try {
    const result = await passwordService.confirmPasswordReset(
      username,
      token,
      newPassword
    );
    return res.status(200).json({ message: "Password reset successful", data: result._id.toString() });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
