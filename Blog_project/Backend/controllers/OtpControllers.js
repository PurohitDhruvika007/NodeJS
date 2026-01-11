import { User } from "../models/UserModels.js";
import { generateOTP } from "../utils/GenerateOtp.js";
import { sendEmail } from "../utils/SendEmail.js";

export const sendOTP = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.isVerified) {
            return res.status(400).json({ message: "User already verified" });
        }

        const otp = generateOTP();

        user.otp = otp;
        user.otpExpiry = new Date(Date.now() + 5 * 60 * 1000);
        await user.save();

        await sendEmail(
            email,
            "Your OTP for Blog Management System",
            `Your OTP is ${otp}. It is valid for 5 minutes.`
        );

        res.json({ message: "OTP sent successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



export const verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }


        if (
            user.otp !== otp ||
            user.otpExpiry < Date.now()
        ) {
            return res.status(400).json({ message: "Invalid or expired OTP" });
        }


        user.isVerified = true;
        user.otp = undefined;
        user.otpExpiry = undefined;
        await user.save();

        res.json({ message: "OTP verified successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
