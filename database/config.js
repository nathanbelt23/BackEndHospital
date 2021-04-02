const mongoose = require('mongoose');
require('dotenv').config();
const connectDB = async() => {

    try {

        await mongoose.connect(process.env.DATABASE, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });
        console.log('Connect DB ' + process.env.DATABASE);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }

}

module.exports = connectDB;