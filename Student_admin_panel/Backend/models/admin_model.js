import mongoose from "mongoose"

const adminSchema = new mongoose.Schema({
    auth_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "auth",
        required: true
    }
}, { timestamps: true });

export const adminCollection = mongoose.model("admin", adminSchema);