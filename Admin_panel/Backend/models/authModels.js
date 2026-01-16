import mongoose from "mongoose";

const AuthSchema = new mongoose.Schema({
    email: String,
    password: String
}, { timestamps: true });

export const AuthCollection = mongoose.model("auth", AuthSchema);