//using mongoose, create the user schema
const mongoose = require("mongoose");
const messages = require("../assets/i18n/validationErrors");
const i18n = require("../services/i18n/translationService");
const Schema = mongoose.Schema;
const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: true },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        i18n.__(messages.invalidEmail),
      ],
    },
    created_at: { type: Date, default: Date.now },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
    role: { type: Schema.Types.ObjectId, ref: "Role" },
  },
  { collection: "users" }
);

module.exports = mongoose.model("User", UserSchema);
