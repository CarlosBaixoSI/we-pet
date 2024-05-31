const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const shelterSchema = new Schema({
  name: String,
  description: String,
  email: String,
  birth_date: Date,
  phone_number: String,
  country: String,
  city: String,
  postal_code: String,
  latitude: String,
  longitude: String,
  address: String,
  isVerified: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  profileImage: {
    type: String,
    default: null,
  },
  profileImageUrl: {
    type: String,
    default: null,
  },
});

module.exports = mongoose.model("Shelter", shelterSchema);
