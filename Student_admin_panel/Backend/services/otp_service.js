import otpCollection from "../models/otp_model.js";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS
    }
});


export const sendEmail = async (email) => {
    try {

        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        const otpHash = await bcrypt.hash(otp, 10);

        const expiry = new Date(Date.now() + 2 * 60 * 1000);

        await otpCollection.deleteMany({ email });

        await otpCollection.create({
            email,
            otp: otpHash,
            expiry,
            attempts: 0
        });

        await transport.sendMail({
            from: `OTP Verification <${process.env.EMAIL}>`,
            to: email,
            subject: "OTP Verification",
            text: `Your OTP is ${otp}. It will expire in 2 minutes.`
        });

        return true;
    } catch (err) {
        console.error(err);
        return false;
    }
};
