// import nodemailer from "nodemailer";
// import dotenv from "dotenv";

// export const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//         user: process.env.EMAIL,
//         pass: process.env.PASS
//     }
// })

import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS
    }
});

export const sendOtpMail = async (email, otp) => {
    try {
        await transport.sendMail({
            from: `OTP Service <${process.env.EMAIL}>`,
            to: email,
            subject: "Your OTP Code",
            text: `Your OTP is ${otp}. It expires in 2 minutes.`
        });
        return true;
    } catch (err) {
        console.error("Mail sending error:", err);
        return false;
    }
};
