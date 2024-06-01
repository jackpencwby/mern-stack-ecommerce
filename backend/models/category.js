const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
    name: {
        type: String
    },
    products: {
        type: [mongoose.Schema.ObjectId],
        ref: "products",
        default: []
    }
});

const Category = mongoose.model("category", categorySchema);

module.exports = Category;