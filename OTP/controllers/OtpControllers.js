// import { transporter } from "../services/MailServices.js"
// export const sendMail = async (req, res) => {
//     await transporter.sendMail({
//         from: `OTP services <${process.env.EMAIL}>`,
//         to: "purohitdhruvika87@gmail.com",
//         subject: "your OTP code",
//         text: "your OTP is 123456 ,it will expires in 2 minutes."
//     })
//     res.json({ message: "OTP send successfully" });
// }

import { OtpModel } from "../models/OtpModels.js";
import { sendOtpMail } from "../services/MailServices.js";

export const sendOtp = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);
    const expiry = new Date(Date.now() + 2 * 60 * 1000);

    try {
        // Remove previous OTPs
        await OtpModel.deleteMany({ email });

        await OtpModel.create({ email, otp, expiry });

        const mailStatus = await sendOtpMail(email, otp);

        if (!mailStatus) {
            return res.status(500).json({ message: "Failed to send OTP" });
        }

        res.status(200).json({ message: "OTP sent successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "OTP generation failed" });
    }
};

export const verifyOtp = async (req, res) => {
    const { email, otp } = req.body;

    if (!email || !otp) {
        return res.status(400).json({ message: "Email and OTP are required" });
    }

    try {
        const record = await OtpModel.findOne({ email });

        if (!record) {
            return res.status(400).json({ message: "OTP not found" });
        }

        if (record.otp !== Number(otp)) {
            return res.status(400).json({ message: "OTP mismatched" });
        }

        if (record.expiry < new Date()) {
            return res.status(400).json({ message: "OTP expired" });
        }

        await OtpModel.deleteMany({ email });

        res.status(200).json({ message: "OTP verified successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "OTP verification failed" });
    }
};
