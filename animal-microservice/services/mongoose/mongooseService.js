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

      const Breeds = [
        'Labrador Retriever',
        'German Shepherd',
        'Golden Retriever',
        'Bulldog',
        'Beagle',
        'Poodle',
        'Rottweiler',
        'Yorkshire Terrier',
        'Boxer',
        'Dachshund',
        'Siamese',
        'Persian',
        'Maine Coon',
        'Sphynx',
      ];

      const descriptionPhrases = [
        'loves to play fetch',
        'is very friendly with kids',
        'enjoys long walks in the park',
        'has a calm and gentle demeanor',
        'is full of energy and loves to run',
        'is very affectionate and loves to cuddle',
        'has a beautiful shiny coat',
        'is well-trained and obedient',
        'loves to explore new places',
        'is very curious and adventurous',
        'enjoys being around people',
        'is very protective and loyal',
        'is a quick learner and very intelligent',
        'is a bit shy but warms up quickly',
        'has a playful and mischievous personality'
      ];

      usersAndShelters.forEach(({ user_id, shelter_id }) => {
        for (let i = 0; i < 12; i++) {
          animals.push({
            name: faker.name.firstName(),
            birth_date: faker.date.between('2010-01-01', '2022-01-01'),
            description: faker.random.arrayElement(descriptionPhrases),
            gender: faker.random.arrayElement(['male', 'female']),
            user_id: user_id,
            shelter_id: shelter_id,
            city: faker.address.city(),
            size: faker.random.arrayElement(['small', 'medium', 'large']),
            animal_type: faker.random.arrayElement(['cat', 'dog', 'rabbit']),
            breed: faker.random.arrayElement(Breeds),
            createdAt: faker.date.past(),
            status: faker.random.arrayElement(['fit', 'fat', 'playful', 'aggressive', 'injured']),
            latitude: faker.address.latitude(),
            longitude: faker.address.longitude(),
            profileImage: "08dff8ba8e9a6bb669ca7295d99ac1075fb6fc603d1ce8f8365f2b7099b12a90"
          });
        }
      });

      const animalList = await Animal.find({});
      if (animalList.length < 25 ) {
        // Insert the generated animal documents
        await Animal.insertMany(animals);
      }
      console.log("Animals populated successfully");
    } catch (error) {
      console.error("Error populating animals:", error);
    }
  })
  .catch((err) => {
    console.log(err);
  });
