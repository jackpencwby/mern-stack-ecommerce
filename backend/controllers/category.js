const Category = require("../models/category");

async function readAllCategory(req, res) {
    try {
        const category = await Category.find().exec();
        res.status(200).json(category);
    }
    catch (error) {
        console.error(error.message);
        res.status(500).json({
            message: error.response
        })
    }
}

async function readCategory(req, res) {
    try {
        const id = req.params.id;
        const category = await Category.findOne({ _id: id }).exec();
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

        const category = await new Category({
            name
        });
        category.save();

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

async function deleteCategory(req, res) {
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

module.exports = { readAllCategory, readCategory, createCategory, updateCategory, deleteCategory };