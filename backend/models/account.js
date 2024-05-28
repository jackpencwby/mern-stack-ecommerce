const mongoose = require("mongoose");

const accountSchema = mongoose.Schema({
    email: {
        type: String
    },
    password: {
        type: String
    },
    role: {
        type: String
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});

const Account = mongoose.model("accounts", accountSchema);

module.exports = Account;