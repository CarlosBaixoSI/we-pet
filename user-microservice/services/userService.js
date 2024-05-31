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

exports.updateUserImageByID = async (id, profileImage) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { profileImage: profileImage },
            { new: true, useFindAndModify: false }
        );

        if (!updatedUser) {
            throw new Error('User not found');
        }

        console.log("User updated", updatedUser);

        return updatedUser;
    } catch (error) {
        console.error('Error updating user image:', error);
        throw error;
    }
};

exports.getUserByEmail = async (email) => {
    return await User.findOne({ email: email });
}

exports.updateUser = async (email, user) => {
    return await User.findOneAndUpdate({ email: email }, user);
}

exports.deleteUser = async (id) => {
    return await User.findByIdAndDelete(id);
}

exports.getUserIDByEmail = async (email) => {
    return await User.findOne({ email: email });
}
