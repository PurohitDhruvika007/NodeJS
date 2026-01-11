import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config()

export const authMiddleware = (req, res, next) => {
    try {
        const token = req.cookies.token;

        // check token exists
        if (!token) {
            return res.status(401).json({ message: "Login required" });
        }

        // verify token
        const decoded = jwt.verify(token, process.env.JWT_KEY);

        // attach user info to request
        req.user = {
            id: decoded.id
        };

        next(); // allow access
    } catch (error) {
        res.status(401).json({ message: "Invalid or expired token" });
    }
};
