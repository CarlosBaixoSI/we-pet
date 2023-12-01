const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const advertisementSchema = new Schema(
  {
    description: String,
    city: String,
    rating_avg: Number,
    createdAt: {
      type: Date,
      default: Date.now,
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    collection: "advertisements",
  }
);

module.exports = mongoose.model("Advertisement", advertisementSchema);
