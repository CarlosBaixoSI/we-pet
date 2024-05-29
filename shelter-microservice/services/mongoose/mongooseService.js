const mongoose = require('mongoose');
require('dotenv').config();
const Shelter = require('../../models/Shelter');

const uri = process.env.ATLAS_URL;

mongoose.Promise = global.Promise;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        console.log('MongoDB connected');

        try {
            // Create shelters only if they don't exist
            const shelters = await Shelter.find({});
            if (shelters.length === 0) {
                // Insert initial data
                await Shelter.create([
                    {
                        name: "Shelter Carlos Beiramar",
                        description: "A shelter for homeless animals created by Carlos Beiramar",
                        email: "info@example1.com",
                        birth_date: new Date("2000-01-01"),
                        phone_number: "1234567890",
                        country: "Portugal",
                        city: "Braga",
                        postal_code: "4705",
                        address: "123 Main St",
                        isVerified: true,
                        user_id: "661d8e233509ebb0645ace96",
                        createdAt: Date.now(),
                        latitude: "41.15",
                        longitude: "-8.61024"
                    },
                    {
                        name: "Shelter João Silva",
                        description: "A shelter for homeless animals created by João Silva",
                        email: "info@example1.com",
                        birth_date: new Date("2000-01-01"),
                        phone_number: "1234567890",
                        country: "Portugal",
                        city: "Braga",
                        postal_code: "4705",
                        address: "123 Main St",
                        isVerified: true,
                        user_id: "661d8e233509ebb0645ace95",
                        createdAt: Date.now(),
                        latitude: "41.5518",
                        longitude: "-8.4229"
                    },
                    {
                        name: "Shelter Carlos Baixo",
                        description: "A shelter for homeless animals created by Carlos Baixo",
                        email: "info@example1.com",
                        birth_date: new Date("2000-01-01"),
                        phone_number: "1234567890",
                        country: "Portugal",
                        city: "Braga",
                        postal_code: "4705",
                        address: "123 Main St",
                        isVerified: true,
                        user_id: "661d8e233509ebb0645ace95",
                        createdAt: Date.now(),
                        latitude: "38.7071",
                        longitude: "-9.13549"
                    },
                ]);

                console.log("Shelters populated successfully");
            } else {
                console.log("Shelters already exist, skipping population");
            }
        } catch (error) {
            console.error("Error populating shelters:", error);
        }
    })
    .catch((err) => {
        console.log(err);
    });
