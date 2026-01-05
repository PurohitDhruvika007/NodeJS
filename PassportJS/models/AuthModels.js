import mongoose from "mongoose";

const authSchema = mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true }
}, { timestamps: true });

export const Auth = new mongoose.model("auth", authSchema);