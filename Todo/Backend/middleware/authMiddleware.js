import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const isVerified = async (req, res, next) => {
    try {
        const token = req.cookies.authenticate_token;
        if (!token) {
            return res.json({ status: false, message: "first login" });
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.userId = decoded.userId;
        next();
    }
    catch (err) {
        return res.json({ status: false, message: err.message });
    }
}