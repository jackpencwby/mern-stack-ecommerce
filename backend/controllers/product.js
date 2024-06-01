const Product = require("../models/product");
const Category = require("../models/category");

async function getAllProduct(req, res) {
    try {
        const products = await Product.find().populate("category");
        res.status(200).json(products);
    }
    catch (error) {
        console.error(error.message);
        res.status(500).json({
            message: error.response
        })
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

        const {_id: ObjectIdCategory} = await Category.findOne({name: category});

        const newProduct = new Product({
            name,
            price,
            image: image.filename,
            quantity,
            category: ObjectIdCategory
        });
        await newProduct.save();

        await Category.updateOne({_id: ObjectIdCategory}, {$push : {products: newProduct._id}});

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
        const name = req.body.name;

        const category = await Category.findOne({ _id: id }).exec();

        const newCategory = {
            name: name || category.name
        }
        await Category.updateOne({ _id: id }, { $set: newCategory }).exec();

        res.status(200).json({
            message: "Edit Successfully"
        })
    }
    catch (error) {
        console.error(error.message);
        res.status(500).json({
            message: error.message
        })
    }
}

async function deleteProduct(req, res) {
    try {
        const id = req.query.id;

        await Category.deleteOne({ _id: id });

        res.status(200).json({
            message: "Delete Successfully"
        })
    }
    catch (error) {
        console.error(error.message);
        res.status(500).json({
            message: error.message
        })
    }
}

module.exports = { getAllProduct, getProduct, createProduct, updateProduct, deleteProduct };