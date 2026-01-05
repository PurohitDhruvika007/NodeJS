import { Auth } from '../models/AuthModels.js';
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const signup = async (req, res) => {
    try {
        const { email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await Auth.create({ email, password: hashedPassword });
        res.json({ message: "user registered successfully!!", result });
    }
    catch (err) {
        res.json({ message: "user not registered!!", err: err });
    }
}

export const signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Auth.findOne({ email });
        if (!user) {
            return res.json({ message: "user not found !!" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ message: "password is incorrect" });
        }
        const token = jwt.sign({ userId: user._id }, "!@#$%^&*()", { expiresIn: "1h" });
        return res.json({ message: "user signin successfully", token });
    }
    catch (err) {
        res.json({ message: "user signin failed!!", err });
    }
}

export const homePage = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({ message: "Authorization header missing" });
        }

        const token = authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "Token not provided" });
        }

        const decoded = jwt.verify(token, "!@#$%^&*()");

        res.json({
            message: "Welcome to home page",
            userId: decoded.userId
        });
    }
    catch (err) {
        res.status(401).json({
            message: "Invalid or expired token",
            error: err.message
        });
    }
};
