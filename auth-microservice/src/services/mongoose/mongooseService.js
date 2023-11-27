const mongoose=require('mongoose');
require('dotenv').config();
const Role = require('../../models/role');

const uri=process.env.ATLAS_URL;

mongoose.Promise=global.Promise;

mongoose.connect(uri).then(()=>{
    console.log('MongoDB connected');  
}).catch((err)=>{
    console.log(err);
});

const db = mongoose.connection;

db.once('open', async () => {
    try {
        // Check if there are any roles in the collection
        const count = await Role.countDocuments();

        if (count === 0) {
            // Insert default roles if no roles exist
            await Role.insertMany([
                { name: 'admin', description: 'Administrator' },
                { name: 'user', description: 'User' }
            ]);
            console.log('Default roles inserted successfully!');
        }
    } catch (err) {
        console.error('Error inserting default roles:', err);
    }
});