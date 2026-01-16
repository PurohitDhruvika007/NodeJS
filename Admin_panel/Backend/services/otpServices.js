import { OtpCollection } from "../models/otpModels.js";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
dotenv.config();

const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
        email: process.env.EMAIL,
        pass: process.env.PASS
    }
});

export const sendOTP = async (email) => {
    const otp = Math.floor(100000 + Math.random() * 90000);
    const expiry = new Date(Date.now() + 1000 * 60 * 2);
    try {
        await OtpCollection.create({ email, otp, expiry });
        await transport.sendOTP({
            from: process.env.EMAIL,
            to: email,
            subject: "OTP verification",
            text: `your OTP is ${otp} ,expires in 2 minutes`
        })
        return true
    }
    catch (err) {
        return false
    }
}