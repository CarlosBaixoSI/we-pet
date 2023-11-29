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
    address: String,
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Shelter", shelterSchema);
