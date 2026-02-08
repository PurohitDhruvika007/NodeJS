import mongoose from 'mongoose'

const AuthSchema = new mongoose.Schema({
    email: { type: String, unique: true, required: true },
    password: String,
    name: String,
    status: { type: String, default: "active" },
    role: { type: String, enum: ["admin", "student"] },
    lastLogin: Date
}, { timestamps: true });

export const AuthCollection = mongoose.model("auth", AuthSchema);