import mongoose from "mongoose";

const OtpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    otp: {
        type: Number,
        required: true
    },
    expiry: {
        type: Date,
        required: true,
        expires: 0   // TTL index (auto delete after expiry)
    }
}, { timestamps: true });

export const OtpModel = mongoose.model("Otp", OtpSchema);
