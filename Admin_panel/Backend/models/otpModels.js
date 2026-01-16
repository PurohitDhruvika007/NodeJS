import mongoose from "mongoose";

const OtpSchema = new mongoose.Schema({
    email: String,
    otp: Number,
    expiry: Date
}, { timestamps: true });

export const OtpCollection = mongoose.model("otp", OtpSchema);