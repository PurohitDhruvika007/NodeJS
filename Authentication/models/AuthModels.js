import mongoose from "mongoose";

const authSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: String, required: true }
})

export const Auth = mongoose.model("auth", authSchema);

