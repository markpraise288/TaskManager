
const mongoose = require('mongoose');
const { MONGO_URL } = require('../../config/env');

const connectDB = async() => {
    try{
        await mongoose.connect(MONGO_URL);
        console.log('MongoDB connected');
    } catch (err) {
        console.error('MongoDB connection filed');
        process.exit(1);
    }
}

module.exports = connectDB;
