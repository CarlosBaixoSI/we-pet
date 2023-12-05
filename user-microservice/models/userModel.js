const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: String,
    birth_date: Date,
    phoneNumber: String,
    updatedAt: {
      type: Date,
      default: Date.now,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    address: String,
    city: String,
  },
  {
    collection: "users",
  }
);

module.exports = mongoose.model("Users", userSchema);
