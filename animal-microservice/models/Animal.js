const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GenderEnum = Object.freeze({
    MALE: 'male',
    FEMALE: 'female',
    OTHER: 'other'
  });


const animalSchema = new Schema({
    name: String,
    birth_date: Date,
    description: String,
    gender:{
        type: String,
        enum: Object.values(GenderEnum) 
    },
    size: String,
    animal_type: String,
    breed: String,
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Animal", animalSchema);
