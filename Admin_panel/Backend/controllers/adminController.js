import { UserCollection } from "../models/userModels.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"

dotenv.config()

export const getAllUsers = async (req, res) => {
    try {
        const users = await UserCollection.find();
        res.json({ status: true, message: "all users fetched successfully", users });
    }
    catch (err) {
        res.json({ status: false, message: err.message })
    }
}

export const updateUser = async (req, res) => {
    try {
        const { email } = req.body;
        await UserCollection.updateOne({ email }, { $set: req.body })
        res.json({ status: true, message: "data updated successfully" })

    }
    catch (err) {
        res.json({ status: false, message: err.message })
    }
}

export const deleteUser = async (req, res) => {
    try {
        const id = req.query.id;
        await UserCollection.findByIdAndDelete(id);
        res.json({ status: true, message: "data updated successfully" });
    }
    catch (err) {
        res.json({ status: false, message: err.message });
    }
}

export const getCurrentUser = async (req, res) => {
    try {
        const token = req.cookies.auth_token;
        if (!token) {
            return res.json({ status: false, message: "login first" });
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        const user = await UserCollection.findById(decoded.userId);

        if (!user) {
            return res.json({ status: false, message: "user not found" });
        }

        res.json({
            status: true,
            message: "current user fetched successfully",
            user
        });
    }
    catch (err) {
        res.json({ status: false, message: err.message });
    }
};

