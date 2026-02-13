import { UserCollection } from "../models/userModels.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"
import { AuthCollection } from "../models/authModels.js";

dotenv.config()

export const getAllUsers = async (req, res) => {
    const { skip, limit } = req.query;
    try {
        // const users = await UserCollection.find();
        const users = await AuthCollection.find().populate("user").skip(skip).limit(limit);
        res.json({ status: true, message: "all users fetched successfully", users });
    }
    catch (err) {
        res.json({ status: false, message: err.message })
    }
}

export const updateUser = async (req, res) => {
    try {
        const {
            _id,
            email,
            name,
            phone,
            address,
            education,
            age,
            experience,
            role
        } = req.body;

        let authUser;
        let userId;

        // 🔎 Case 1: If _id is Auth ID
        authUser = await AuthCollection.findById(_id);

        if (authUser) {
            userId = authUser.user;
        } else {
            // 🔎 Case 2: If _id is User ID
            authUser = await AuthCollection.findOne({ user: _id });

            if (!authUser) {
                return res.json({
                    status: false,
                    message: "Auth user not found"
                });
            }

            userId = _id;
        }

        // ✏️ Update Auth email
        if (email) {
            authUser.email = email;
            await authUser.save();
        }

        // ✏️ Update User profile
        const updatedUser = await UserCollection.findByIdAndUpdate(
            userId,
            {
                name,
                phone,
                address,
                education,
                age,
                experience,
                role
            },
            { new: true }
        );

        if (!updatedUser) {
            return res.json({
                status: false,
                message: "User profile not found"
            });
        }

        res.json({
            status: true,
            message: "User updated successfully",
            user: updatedUser
        });

    } catch (err) {
        res.json({
            status: false,
            message: err.message
        });
    }
};



export const deleteUser = async (req, res) => {
    try {
        const id = req.query.id;

        console.log("Deleting Auth ID:", id);

        // Step 1: Delete auth and get deleted document
        const deletedAuth = await AuthCollection.findByIdAndDelete(id);

        if (!deletedAuth) {
            return res.json({
                status: false,
                message: "User not found"
            });
        }

        // Step 2: Delete linked user profile
        if (deletedAuth.user) {
            await UserCollection.findByIdAndDelete(deletedAuth.user);
        }

        res.json({
            status: true,
            message: "User deleted from both collections successfully"
        });

    } catch (err) {
        res.json({
            status: false,
            message: err.message
        });
    }
};


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

