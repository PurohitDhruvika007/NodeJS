import jwt from "jsonwebtoken";
import { AuthCollection } from "../models/auth_model.js";

export const verifyToken = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ message: "Not authenticated" });
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        const user = await AuthCollection.findById(decoded.id).select("-password");

        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        req.user = user;   // attach user to request
        next();

    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};

// ✅ Role based middleware
export const isAdmin = (req, res, next) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Admin access required" });
    }
    next();
};

export const isStudent = (req, res, next) => {
    if (req.user.role !== "student") {
        return res.status(403).json({ message: "Student access required" });
    }
    next();
};
