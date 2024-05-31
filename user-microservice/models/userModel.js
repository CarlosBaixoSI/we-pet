const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: String,
    email: {
      type: String,
      unique: true,
    },
    birth_date: {
      type: Date,
      default:  null,
    },
    phoneNumber: {
      type: String,
      default: null,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    city: {
      type: String,
      default: null,
    },
    profileImage:{
      type: String,
      default: null,
    },
    profileImageUrl:{
      type: String,
      default: null,
    }
  },
  {
    collection: "users",
  }
);

module.exports = mongoose.model("Users", userSchema);
