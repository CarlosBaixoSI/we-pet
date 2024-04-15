const mongoose = require('mongoose');
require('dotenv').config();
const User = require('../../models/userModel'); // Import your User model

const uri = process.env.ATLAS_URL;

mongoose.Promise = global.Promise;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        console.log('MongoDB connected');

        try {
            const users = await User.find({});
            if (users.length === 0) {

                // Insert initial data
                await User.create([
                    {
                        name: "João Silva",
                        email: "a16951@alunos.ipca.pt",
                        birth_date: new Date("1998-06-25"),
                        phoneNumber: "911231231",
                        city: "Braga",
                        createdAt: Date.now(),
                        updatedAt: Date.now(),
                    },
                    {
                        name: "Carlos Beiramar",
                        email: "a2069@alunos.ipca.pt",
                        birth_date: new Date("1997-01-06"),
                        phoneNumber: "911231231",
                        city: "Braga",
                        createdAt: Date.now(),
                        updatedAt: Date.now(),
                    },
                    {
                        name: "Carlos Baixo",
                        email: "a16949@alunos.ipca.pt",
                        birth_date: new Date("1998-06-25"),
                        phoneNumber: "911231231",
                        city: "Braga",
                        createdAt: Date.now(),
                        updatedAt: Date.now(),
                    }
                ]);

                console.log("Users populated successfully");
            } else {
                console.log("Users already exist, skipping population");
            }
        } catch (error) {
            console.error("Error populating Users:", error);
        }
    })
    .catch((err) => {
        console.log(err);
    });
