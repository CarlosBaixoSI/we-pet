const User = require("../models/userModel");

exports.getAllUsers = async () => {
    return await User.find();
}

exports.createUser = async (user) => {
    return await User.create(user);
}

exports.getUserByID = async (id) => {
    return await User.findById(id);
}

exports.getUserByEmail = async (email) => {
    return await User.findOne({ email: email });
}

exports.updateUser = async (email, user) => {
    return await User.findOneAndUpdate({ email: email }, user);
}

exports.deleteUser = async (id) => {
    return await User.findByIdAndDelete(id);
}
