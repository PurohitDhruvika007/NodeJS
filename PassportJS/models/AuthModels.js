import mongoose from "mongoose";

const authSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true }
}, { timestamps: true });

export const Auth = mongoose.model("auth", authSchema);