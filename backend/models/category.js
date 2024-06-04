const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
    name: {
        type: String
    },
    products: {
        type: [mongoose.Schema.ObjectId],
        ref: "product",
        default: []
    }
});

const Category = mongoose.model("category", categorySchema);

module.exports = Category;