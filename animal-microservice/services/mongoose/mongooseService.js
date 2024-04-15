const mongoose = require('mongoose');
require('dotenv').config();
const Animal = require('../../models/Animal'); // Import your Animal model
const faker = require('faker'); // Import faker.js library for generating random data

const uri = process.env.ATLAS_URL;

mongoose.Promise = global.Promise;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('MongoDB connected');

    try {
      // Clear existing animals
      await Animal.deleteMany({});

      const usersAndShelters = [
        {
          user_id: "661d8e233509ebb0645ace95",
          shelter_id: "661d8ffd8b5035e4836d6aeb",
        },
        {
          user_id: "661d8e233509ebb0645ace95",
          shelter_id: "661d8ffd8b5035e4836d6aec",
        },
        {
          user_id: "661d8e233509ebb0645ace96",
          shelter_id: "661d8ffd8b5035e4836d6aea",
        }
      ];

      const animals = [];

      usersAndShelters.forEach(({ user_id, shelter_id }) => {
        for (let i = 0; i < 12; i++) {
          animals.push({
            name: faker.name.firstName(),
            birth_date: faker.date.between('2010-01-01', '2022-01-01'),
            description: faker.lorem.sentence(),
            gender: faker.random.arrayElement(['male', 'female', 'other']),
            user_id: user_id,
            shelter_id: shelter_id,
            city: faker.address.city(),
            size: faker.random.arrayElement(['small', 'medium', 'large']),
            animal_type: faker.random.arrayElement(['cat', 'dog', 'rabbit']),
            breed: faker.random.word(),
            createdAt: faker.date.past(),
          });
        }
      });

      // Insert the generated animal documents
      await Animal.insertMany(animals);

      console.log("Animals populated successfully");
    } catch (error) {
      console.error("Error populating animals:", error);
    }
  })
  .catch((err) => {
    console.log(err);
  });
