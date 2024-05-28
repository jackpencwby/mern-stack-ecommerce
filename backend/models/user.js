const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    fullname: {
        type: String
    },
    birthday: {
        type: Date
    },
    phone_number: {
        type: String
    }
});

const User = mongoose.model("users", userSchema);

module.exports = User;