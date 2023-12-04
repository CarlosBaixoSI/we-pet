const authService = require("../services/AuthService");

exports.signup = async (req, res) => {
  try {
    const userId = await authService.signUp(req.body);
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
    return res
      .status(200).json({ message: "Logout successful" });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Logout failed" + ": " + error.message });
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
  try {
    const isAdmin = await authService.isAdmin(token);
    return res.status(200).json({ data: isAdmin, message: "Success" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
