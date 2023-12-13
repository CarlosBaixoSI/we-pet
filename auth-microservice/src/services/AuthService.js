const UserModel = require("../models/user");
const RoleModel = require("../models/role");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const JWT_SECRET = process.env.JWT_SECRET;

exports.getAllUsers = async () => {
  return await UserModel.find({});
};

exports.createUser = async (user) => {
  return await UserModel.create(user);
};

exports.getUserById = async (id) => {
  return await UserModel.findById(id);
};

exports.updateUser = async (id, user) => {
  return await UserModel.findByIdAndUpdate(id, user);
};

exports.deleteUser = async (id) => {
  return await UserModel.findByIdAndDelete(id);
};

exports.signUp = async (user) => {
  const role = await getUserRole(user);

  try {
    const newUser = new UserModel(user);
    newUser.password = await bcrypt.hash(newUser.password, 10);
    newUser.role = role;
    const savedUser = await newUser.save();
    return savedUser._id;
  } catch (error) {
    console.log(error);
    return error;
  }
};

exports.signIn = async (username, password) => {
  const user = await UserModel.findOne({
    $or: [{ username: username }, { email: username }],
  });

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    throw new Error("Invalid credentials");
  }

  //create the token
  const token = jwt.sign(
    { user_id: user._id, role_id: user.role },
    JWT_SECRET,
    {
      expiresIn: 86400,
    }
  );

  return token;
};

exports.isAdmin = async (token) => {
  if (!token) {
    throw new Error("No token provided");
  }

  //If token has 'Bearer', remove it
  if (token.startsWith("Bearer ")) {
    token = token.slice(7, token.length);
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const role = await RoleModel.findById(decoded.role_id);

    if (role.name == "admin") {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    throw new Error("Error parsing your token" + ": " + error);
  }
}

exports.signOut = async(res) => {
  try {
    res.clearCookie("token");
    return res
      .status(200).json({ message: "Logout successful" });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Logout failed" + ": " + error.message });
  }
}

exports.checkToken = async(encryptedToken) => {
  //If token has 'Bearer', remove it
  if (encryptedToken.startsWith("Bearer ")) {
    encryptedToken = encryptedToken.slice(7, encryptedToken.length);
  }

  try {
    const decoded = jwt.verify(encryptedToken, JWT_SECRET);
    let response = { userId: decoded.user_id, roleId: decoded.role_id };

    return response;
  } catch (error) {
    return null;
  }
}

//Aux functions
async function getUserRole(user) {
  if (
    user.email === "carlosbaixo.si@gmail.com" ||
    user.email === "carlosbeiramar@gmail.com" ||
    user.email == "joaojcms.lol@gmail.com"
  ) {
    const adminRole = await RoleModel.findOne({ name: "admin" });
    return adminRole._id;
  }
  const userRole = await RoleModel.findOne({ name: "user" });
  return userRole._id;
}


