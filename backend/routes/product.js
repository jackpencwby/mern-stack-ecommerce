const express = require("express");
const { getAllProduct, getProduct, createProduct, updateProduct, deleteProduct } = require("../controllers/product");
const auth = require("../middlewares/auth");
const checkAdmin = require("../middlewares/checkAdmin");
const upload = require("../middlewares/upload");

const router = express.Router();

// http://localhost:8080/api/product
router.get("/", auth, getAllProduct);

// http://localhost:8080/api/product/:id
router.get("/:id", auth, getProduct);

// http://localhost:8080/api/product
router.post("/", auth, checkAdmin, upload, createProduct);

// http://localhost:8080/api/product?id
router.put("/", auth, checkAdmin, upload, updateProduct);

// http://localhost:8080/api/product?id
router.delete("/", auth, checkAdmin, deleteProduct);

module.exports = router;