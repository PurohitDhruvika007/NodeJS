import { UserCollection } from "../models/userModels.js";

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
        const { email } = req.body;
        await UserCollection.deleteOne({ email });
        res.json({ status: true, message: "data updated successfully" });
    }
    catch (err) {
        res.json({ status: false, message: err.message });
    }
}

export const getUser = async (req, res) => {
    try {
        const { email } = req.body;
        const result = await UserCollection.findOne({ email });
        res.json({ status: true, message: "user fetched successfully", result });
    }
    catch (err) {
        res.json({ status: false, message: err.message });
    }
}