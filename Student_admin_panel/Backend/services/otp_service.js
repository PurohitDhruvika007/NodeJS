export { otpCollection } from "../models/otp_model.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config()

const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS
    }
});

export const sendEmail = async (email) => {
    const otp = Math.floor(100000 + Math.random() * 90000).toString();
    const expiry = new Date(Date.now() + (1000 * 60 * 2));
    try {
        await otpCollection.create({ email, otp, expiry });

        transport.sendMail({
            from: `OTP <${process.env.EMAIL}>`,
            to: email,
            subject: "OTP verification",
            title: `your OTP is ${otp} ,expires in 2 minutes`
        })

        return true;
    }
    catch (err) {
        return false;
    }
}