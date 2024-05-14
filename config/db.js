const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/electronic");
        console.log(`Connected to Mongodb database`.bgMagenta.white);
        
    } catch (error) {
        console.log(`MONGO Connect Error ${error}`.bgRed.white);
    }
};

module.exports = connectDB;