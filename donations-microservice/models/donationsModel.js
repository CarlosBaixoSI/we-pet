const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const donationsSchema = new Schema(
  {
    amount: Number,
    createdAt: {
      type: Date,
      default: Date.now,
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    shelter_id: {
      type: Schema.Types.ObjectId,
      ref: "Shelter",
      required: true,
    }
  },
  {
    collection: "donations",
  }
);

module.exports = mongoose.model("Donations", donationsSchema);
