require("dotenv").config();
const mongoose = require("mongoose");

const connectDatabase = async () => {
    try {
        await mongoose.connect(process.env.CONNECTION_STRING);
        console.log("Connect to database successfully");
    }
    catch (error) {
        console.error(error);
    }
}

module.exports = connectDatabase;