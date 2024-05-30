require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Account = require("../models/account");
const User = require("../models/user");

async function register(req, res) {
    try {
        const { fullname, birthday, phone_number, email, password, confirm_password } = req.body;
        if (!fullname || !birthday || !phone_number || !email || !password || !confirm_password) {
            throw { statusCode: 400, message: "กรุณาใส่ข้อมูลให้ครบ" };
        }

        const accountInDatabase = await Account.findOne({ email }).exec();
        if (accountInDatabase) {
            throw { statusCode: 400, message: "อีเมลนี้ถูกใช้งานเเล้ว" };
        }

        if (password !== confirm_password) {
            throw { statusCode: 400, message: "รหัสผ่านไม่ตรงกัน" };
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const newUser = new User({
            fullname,
            birthday,
            phone_number
        });
        await newUser.save();

        const newAccount = new Account({
            email,
            password: passwordHash,
            role: "user",
            userId: newUser._id
        });
        await newAccount.save();

        res.status(201).json({
            message: "Register Successfully"
        });
    }
    catch (error) {
        const statusCode = error.statusCode || 500;
        const message = error.message || "Internal Server Error";
        console.error(error.message);
        res.status(statusCode).json({ message });
    }
}

async function login(req, res) {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            throw { statusCode: 400, message: "กรุณาใส่ข้อมูลให้ครบ" };
        }

        const accountInDatabase = await Account.findOne({ email }).exec();
        if (!accountInDatabase) {
            throw { statusCode: 401, message: "ไม่มีอีเมลของผู้ใช้งานนี้" };
        }

        const isMatch = await bcrypt.compare(password, accountInDatabase.password);
        if (!isMatch) {
            throw { statusCode: 401, message: "รหัสผ่านไม่ถูกต้อง" };
        }

        const userInDatabase = await User.findOne({ _id: accountInDatabase.userId }).exec();

        const payload = {
            fullname: userInDatabase.fullname,
            role: accountInDatabase.role
        };
        const signature = process.env.SIGNATURE;
        const token = await jwt.sign(payload, signature, { expiresIn: "1h" });

        res.cookie("token", token, {
            maxAge: 30000,
            secure: true,
            httpOnly: true,
            sameSite: "none"
        });

        res.status(200).json({
            message: "Login Successfully",
            role: accountInDatabase.role
        });
    }
    catch (error) {
        const statusCode = error.statusCode || 500;
        const message = error.message || "Internal Server Error";
        console.error(error.message);
        res.status(statusCode).json({ message });
    }
}

async function logout(req, res) {
    try {
        const token = req.cookies.token;
        if (!token) {
            throw { statusCode: 401, message: "กรุณาเข้าสู่ระบบก่อน" };
        }

        res.cookie("token", token, {
            maxAge: 0,
            secure: true,
            httpOnly: true,
            sameSite: "none"
        });

        res.status(200).json({
            message: "Logout Successfully"
        });
    }
    catch (error) {
        const statusCode = error.statusCode || 500;
        const message = error.message || "Internal Server Error";
        console.error(error.message);
        res.status(statusCode).json({ message });
    }
}

module.exports = { register, login, logout };