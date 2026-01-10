import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config()

export const sendEmail = async (to, subject, text) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.USER,
            pass: process.env.PASS
        }
    });

    await transporter.sendMail({
        from: process.env.USER,
        to,
        subject,
        text
    });
};
