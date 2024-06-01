const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    name: {
        type: String
    },
    price: {
        type: Number
    },
    image: {
        type: String
    },
    quantity: {
        type: Number
    },
    sold: {
        type: Number,
        default: 0
    },
    category: {
        type: mongoose.Schema.ObjectId,
        ref: "category"
    }
});

const Product = mongoose.model("product", productSchema);

module.exports = Product;