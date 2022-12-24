const mongoose = require('mongoose');

// function to connect
const dbConnect = async () =>{
    try{
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("db connect succesfully");
    } catch(error){
        console.log(error);
        process.exit(1);
    }
};

dbConnect();