require("dotenv").config();
const jwt = require("jsonwebtoken");

async function auth(req, res, next) {
    try {
        const token = req.cookies.token;
        if (!token) {
            throw { statusCode: 401, message: "กรุณาเข้าสู่ระบบก่อน" };
        }

        await jwt.verify(token, process.env.SIGNATURE);

        next();
    }
    catch (error) {
        const statusCode = (error.statusCode || 401) || 500;
        const message = (error.message || "Invalid Token") || "Internal Server Error";
        console.error(message);
        res.status(statusCode).json({ message });
    }
}

module.exports = auth;