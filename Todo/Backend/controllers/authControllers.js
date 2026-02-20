import { AuthCollection } from "../models/authModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const signup = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const user = await AuthCollection.findOne({ email });
        if (user) {
            return res.json({ status: false, message: "user is already registered" });
        }
        const hashed = await bcrypt.hash(password, 12);
        await AuthCollection.create({
            name,
            email,
            password: hashed
        })
        return res.json({ status: true, message: "user registered successfully" });
    }
    catch (err) {
        return res.json({ status: false, message: err.message });
    }
}

export const signin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await AuthCollection.findOne({ email });
        if (!user) {
            return res.json({ status: false, message: "user not found" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ status: false, message: "password is incorrect" });
        }
        const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: "1h" });
        res.cookie("authenticate_token", token, { httpOnly: true, maxAge: 1000 * 60 * 60 });
        return res.json({ status: true, message: "user signin successfully", token });
    }
    catch (err) {
        return res.json({ status: false, message: err.message })
    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie("authenticate_token");
        return res.json({ status: true, message: "user logout successfully" })
    }
    catch (err) {
        return res.json({ status: false, message: err.message });
    }
}