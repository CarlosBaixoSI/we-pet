const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GenderEnum = Object.freeze({
    MALE: 'male',
    FEMALE: 'female',
    OTHER: 'other'
  });


  const StatusEnum = Object.freeze({
    FIT: 'fit',
    FAT: 'fat',
    PLAYFUL: 'playful',
    AGGRESSIVE: 'aggressive',
    INJURED: 'injured',
    PREGNANT: 'pregnant',
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
    status:{
        type: String,
        enum: Object.values(StatusEnum)
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
    },
    city: String,
    latitude: String,
    longitude: String,
    size: String,
    animal_type: String,
    breed: String,
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Animal", animalSchema);
