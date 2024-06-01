const express = require("express");
const { getAllCategory, getCategory, createCategory, updateCategory, deleteCategory } = require("../controllers/category");
const auth = require("../middlewares/auth");
const checkAdmin = require("../middlewares/checkAdmin");

const router = express.Router();

// http://localhost:8080/api/category
router.get("/", auth, getAllCategory);

// http://localhost:8080/api/category/:id
router.get("/:id", auth, getCategory);

// http://localhost:8080/api/category
router.post("/", auth, checkAdmin, createCategory);

// http://localhost:8080/api/category?id=
router.put("/", auth, checkAdmin, updateCategory);

// http://localhost:8080/api/category?id=
router.delete("/", auth, checkAdmin, deleteCategory);

module.exports = router;