const express = require("express");
const { register, login, logout } = require("../controllers/auth");
const authenticateToken = require("../utils/authenticateToken");

const router = express.Router();

// http://localhost:8000/api/auth/register
router.post("/register", register);

// http://localhost:8000/api/auth/register
router.post("/login", login);

// http://localhost:8000/api/auth/logout
router.get("/logout", logout);

// http://localhost:8000/api/auth/protected
router.get("/protected", authenticateToken);

module.exports = router;