require("dotenv").config();
const jwt = require("jsonwebtoken");

async function authenticateToken(req, res) {
    try {
        const token = req.cookies.token;
        const { fullname, role } = await jwt.verify(token, process.env.SIGNATURE);
        res.send({
            fullname,
            role
        });
    }
    catch (error) {
        console.error(error.message);
        res.status(401).json({
            message: error.message
        });
    }
}

module.exports = authenticateToken;