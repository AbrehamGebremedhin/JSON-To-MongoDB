const mongoose = require('mongoose');

const connectDB = async () =>{
    const conn = await mongoose.connect("mongodb://127.0.0.1:27017/newRecipes", {
        useUnifiedTopology: true
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
}

module.exports = connectDB;