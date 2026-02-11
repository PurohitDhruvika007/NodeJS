import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "auth",
        required: true
    },
    department: {
        type: String,
        required: true
    },
    phone: String,
    address: String,
    photo: String
}, { timestamps: true });

export const adminCollection = mongoose.model("admin", adminSchema);
