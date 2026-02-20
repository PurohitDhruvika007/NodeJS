import mongoose from "mongoose";

const AuthSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true, required: true },
    password: String
}, { timestamps: true });


export const AuthCollection = mongoose.model("Auth", AuthSchema);