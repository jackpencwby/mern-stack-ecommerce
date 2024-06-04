const Category = require("../models/category");
const Product = require("../models/product");
const fs = require("fs");

async function getAllCategory(req, res) {
    try {
        const categories = await Category.find().populate("products");

        res.status(200).json(categories);
    }
    catch (error) {
        console.error(error.message);
        res.status(500).json({
            message: error.response
        })
    }
}

async function getCategory(req, res) {
    try {
        const id = req.params.id;

        const category = await Category.findOne({ _id: id }).populate("products");
        if (!category) {
            throw { statusCode: 404, message: "ไม่พบข้อมูลของหมวดหมู่นี้" };
        }

        res.status(200).json(category);
    }
    catch (error) {
        const statusCode = error.statusCode || 500;
        const message = error.message || "Internal Server Error";
        console.error(error.message);
        res.status(statusCode).json({ message });
    }
}

async function createCategory(req, res) {
    try {
        const { name } = req.body;
        if (!name) {
            throw { statusCode: 400, message: "กรุณาใส่ข้อมูลให้ครบ" };
        }

        await new Category({ name }).save();

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

async function updateCategory(req, res) {
    try {
        const id = req.query.id;
        const { name } = req.body;

        const categoryInDatabase = await Category.findOne({ _id: id });

        await Category.updateOne({ _id: id }, { $set: { name: name || categoryInDatabase.name } });

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

async function deleteCategory(req, res) {
    try {
        const id = req.query.id;

        const categoryInDatabase = await Category.findOneAndDelete({ _id: id }).populate("products");

        for (const product of categoryInDatabase.products) {
            fs.unlinkSync(`./files/ProductImages/${product.image}`);
            await Product.deleteOne({ _id: product._id })
        }

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

module.exports = { getAllCategory, getCategory, createCategory, updateCategory, deleteCategory };