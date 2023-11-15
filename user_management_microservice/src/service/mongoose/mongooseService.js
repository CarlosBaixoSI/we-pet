const mongoose=require('mongoose');
require('dotenv').config();


const uri=process.env.ATLAS_URL;

mongoose.Promise=global.Promise;
mongoose.connect(uri).then(()=>{
    console.log('MongoDB connected');
}).catch((err)=>{
    console.log(err);
});
