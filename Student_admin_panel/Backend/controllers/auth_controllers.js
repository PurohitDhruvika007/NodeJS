import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AuthCollection } from "../models/auth_model.js";
import otpCollection from "../models/otp_model.js";
import { sendEmail } from "../services/otp_service.js";

// ================= REGISTER =================
export const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // ✅ Check if email exists
        const existingUser = await AuthCollection.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "Email already exists" });

        const hash = await bcrypt.hash(password, 10);
        const user = await AuthCollection.create({ name, email, password: hash, role });

        res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ================= LOGIN =================
export const login = async (req, res) => {
    try {
        const email = req.body.email.toLowerCase();
        const password = req.body.password;

        const user = await AuthCollection.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(401).json({ message: "Incorrect password" });

        // ✅ Send OTP
        const sent = await sendEmail(email);
        if (!sent) return res.status(500).json({ message: "Failed to send OTP" });

        res.json({ message: "OTP sent to email", email });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ================= VERIFY OTP =================
export const verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;
        if (!email || !otp) return res.status(400).json({ message: "Email and OTP required" });

        const user = await AuthCollection.findOne({ email: email.toLowerCase() });
        if (!user) return res.status(404).json({ message: "User not found" });

        const record = await otpCollection.findOne({ email: email.toLowerCase() });
        if (!record) return res.status(400).json({ message: "OTP not found" });

        const valid = await bcrypt.compare(otp, record.otp);
        if (!valid) return res.status(401).json({ message: "Invalid OTP" });

        // ✅ Delete OTP after verification
        await otpCollection.deleteMany({ email: email.toLowerCase() });

        // Generate JWT
        const token = jwt.sign(
            { id: user._id, role: user.role, email: user.email },
            process.env.SECRET_KEY,
            { expiresIn: "1h" }
        );

        // Set cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
            maxAge: 60 * 60 * 1000 // 1 hour
        });

        res.json({ message: "OTP verified successfully", role: user.role });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ================= CHECK LOGIN =================
export const checkLogin = async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) return res.status(401).json({ success: false, message: "Not authenticated" });

        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const user = await AuthCollection.findById(decoded.id).select("-password");

        if (!user) return res.status(401).json({ success: false, message: "User not found" });

        res.status(200).json({ success: true, user: { id: user._id, email: user.email, role: user.role } });
    } catch (error) {
        res.status(401).json({ success: false, message: "Invalid or expired token" });
    }
};

// ================= FORGOT PASSWORD =================
export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await AuthCollection.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        // Delete old OTP
        await otpCollection.deleteMany({ email });

        const sent = await sendEmail(email);
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

        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();

        res.json({ message: "Password changed successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ================= LOGOUT =================
export const logout = async (req, res) => {
    res.clearCookie("token");
    res.json({ message: "Logout successful" });
};

// ================= RESEND OTP =================
export const resendOtp = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await AuthCollection.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        // Delete previous OTP before resending
        await otpCollection.deleteMany({ email });
        await sendEmail(email);

        res.json({ message: "OTP resent successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
