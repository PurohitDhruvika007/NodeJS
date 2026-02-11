import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AuthCollection } from "../models/auth_model.js";
import otpCollection from "../models/otp_model.js";
import { sendEmail } from "../services/otp_service.js";

// ================= REGISTER =================
export const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        const hash = await bcrypt.hash(password, 10);

        const user = await AuthCollection.create({
            name,
            email,
            password: hash,
            role
        });

        res.status(201).json({ message: "User registered", user });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ================= LOGIN =================
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await AuthCollection.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(401).json({ message: "Wrong password" });

        // Send OTP to email
        await sendEmail(email);

        // Generate JWT token
        const token = jwt.sign(
            { id: user._id, role: user.role, email: user.email },
            process.env.SECRET_KEY,
            { expiresIn: "1h" }
        );

        res.json({
            message: "OTP sent to email",
            token // <-- use this for protected routes
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ================= VERIFY OTP =================
export const verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;

        const record = await otpCollection.findOne({ email });
        if (!record) return res.status(400).json({ message: "OTP not found" });
        if (record.expiry < new Date()) return res.status(400).json({ message: "OTP expired" });

        const valid = await bcrypt.compare(otp, record.otp);
        if (!valid) return res.status(401).json({ message: "Invalid OTP" });

        // OTP verified — delete it
        await otpCollection.deleteMany({ email });

        res.json({ message: "OTP verified successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ================= FORGOT PASSWORD =================
export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await AuthCollection.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        const sent = await sendEmail(email); // generates OTP, hashes it, saves to DB

        if (sent) return res.json({ message: "OTP sent to email" });
        else return res.status(500).json({ message: "Failed to send OTP" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ================= RESET PASSWORD =================
export const resetPassword = async (req, res) => {
    try {
        const { email, otp, newPassword } = req.body;

        const record = await otpCollection.findOne({ email });
        if (!record) return res.status(400).json({ message: "OTP not found" });
        if (record.expiry < new Date()) return res.status(400).json({ message: "OTP expired" });

        const valid = await bcrypt.compare(otp, record.otp);
        if (!valid) return res.status(401).json({ message: "Invalid OTP" });

        const hash = await bcrypt.hash(newPassword, 10);
        await AuthCollection.updateOne({ email }, { password: hash });
        await otpCollection.deleteMany({ email });

        res.json({ message: "Password reset successful" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ================= CHANGE PASSWORD =================
export const changePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;

        const user = await AuthCollection.findById(req.user.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        const match = await bcrypt.compare(oldPassword, user.password);
        if (!match) return res.status(401).json({ message: "Old password incorrect" });

        const hash = await bcrypt.hash(newPassword, 10);
        user.password = hash;
        await user.save();

        res.json({ message: "Password changed successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ================= LOGOUT =================
export const logout = async (req, res) => {
    res.json({ message: "Logout successful" });
};

// ================= RESEND OTP =================
export const resendOtp = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await AuthCollection.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        await sendEmail(email);

        res.json({ message: "OTP resent successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
