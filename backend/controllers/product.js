const Product = require("../models/product");
const Category = require("../models/category");
const fs = require("fs");

async function getAllProduct(req, res) {
    try {
        const products = await Product.find().populate("category");

        res.status(200).json(products);
    }
    catch (error) {
        console.error(error.message);
        res.status(500).json({
            message: error.response
        });
    }
}

async function getProduct(req, res) {
    try {
        const id = req.params.id;

        const product = await Product.findOne({ _id: id }).populate("category");
        if (!product) {
            throw { statusCode: 404, message: "ไม่พบข้อมูลของสินค้านี้" };
        }

        res.status(200).json(product);
    }
    catch (error) {
        const statusCode = error.statusCode || 500;
        const message = error.message || "Internal Server Error";
        console.error(error.message);
        res.status(statusCode).json({ message });
    }
}

async function createProduct(req, res) {
    try {
        const { name, price, category, quantity } = req.body;
        const image = req.file;
        if (!name || !price || !category || !quantity || !image) {
            if (image) {
                fs.unlinkSync(`./files/ProductImages/${image.filename}`);
            }
            throw { statusCode: 400, message: "กรุณาใส่ข้อมูลให้ครบ" };
        }

        const { _id: ObjectIdCategory } = await Category.findOne({ name: category });

        const newProduct = new Product({
            name,
            price,
            image: image.filename,
            quantity,
            category: ObjectIdCategory
        });
        await newProduct.save();

        await Category.updateOne({ _id: ObjectIdCategory }, { $push: { products: newProduct._id } });

        res.status(201).json({
            message: "Create Successfully"
        });
    }
    catch (error) {
        const statusCode = error.statusCode || 500;
        const message = error.message || "Internal Server Error";
        console.error(error.message);
        res.status(statusCode).json({ message });
    }
}

async function updateProduct(req, res) {
    try {
        const id = req.query.id;
        const { name, price, category, quantity } = req.body;
        const image = req.file;

        const productInDatabase = await Product.findOne({ _id: id }).populate("category");

        if(category) {
            const { _id: ObjectIdCategory } = await Category.findOne({ name: category });
        }

        if (image) {
            fs.unlinkSync(`./files/ProductImages/${productInDatabase.image}`);
        }

        const updateProduct = {
            name: name || productInDatabase.name,
            price: price || productInDatabase.price,
            category: (category && ObjectIdCategory) || productInDatabase.category._id,
            quantity: quantity || productInDatabase.quantity,
            image: (image && image.filename) || productInDatabase.image
        };
        await Product.updateOne(
            { _id: id },
            { $set: updateProduct },
            { returnDocument: 'after' }
        );

        if(category) {
            await Category.updateOne({ _id: productInDatabase.category._id }, { $pull: { products: id } });
            await Category.updateOne({ _id: ObjectIdCategory }, { $push: { products: id } });
        }

        res.status(200).json({
            message: "Update Succesfully"
        });
    }
    catch (error) { 
        res.status(500).json({
            message: error.message
        });
    }
}

async function deleteProduct(req, res) {
    try {
        const id = req.query.id;

        const product = await Product.findOneAndDelete({ _id: id }).populate("category");

        fs.unlinkSync(`./files/ProductImages/${product.image}`);

        await Category.updateOne({ _id: product.category._id }, { $pull: { products: product._id } });

        res.status(200).json({
            message: "Delete Successfully"
        });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).json({
            message: error.message
        });
    }
}

module.exports = { getAllProduct, getProduct, createProduct, updateProduct, deleteProduct };