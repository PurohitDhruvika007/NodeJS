import mongoose from "mongoose";

const AuthSchema = new mongoose.Schema({
    email: { type: String, unique: true, required: true },
    password: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    }
}, { timestamps: true });

export const AuthCollection = mongoose.model("auth", AuthSchema);