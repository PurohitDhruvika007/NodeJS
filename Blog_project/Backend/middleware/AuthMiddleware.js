import jwt from "jsonwebtoken";
import { User } from "../models/UserModels.js";
import dotenv from "dotenv";
dotenv.config();

export const authMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ message: "Login required" });
        }

        const decoded = jwt.verify(token, process.env.JWT_KEY);

        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        if (!user.isVerified) {
            return res.status(403).json({ message: "User not verified" });
        }

        // convert ObjectId to string to match blog.author
        req.user = { id: user._id.toString() };

        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid or expired token" });
    }
};
