import mongoose from "mongoose";

const AuthSchema = new mongoose.Schema({
    email: { type: String, unique: true, required: true },
    password: String,
    name: String,
    role: { type: String, enum: ["admin", "student"], required: true },
}, { timestamps: true });

export const AuthCollection = mongoose.model("auth", AuthSchema);
