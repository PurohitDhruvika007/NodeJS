import { User } from "../models/UserModels.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config()

export const signUp = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const isExisting = await User.findOne({ email });
        if (isExisting) {
            return res.json({ message: "user already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await User.create({
            email,
            name,
            password: hashedPassword
        });
        res.json({ message: "user registered successfully", result })
    }
    catch (err) {
        res.json({ message: "user not registered !!", err });
    }
}

export const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ message: "user not found , first register" });
        }
        if (!user.isVerified) {
            return res.status(401).json({ message: "Please verify OTP first" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ message: "password is incorrect" });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_KEY, { expiresIn: "1d" });
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            maxAge: 1000 * 60 * 60 * 24
        })
        res.json({ message: "Login successful" });

    }
    catch (err) {
        res.json({ message: "user not login !!", err });
    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie("token");
        res.json({ message: "logout successfully" })
    }
    catch (err) {
        res.json({ message: "user not logout" });
    }
}