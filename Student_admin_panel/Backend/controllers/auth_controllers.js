import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AuthCollection } from "../models/auth_model.js";
import otpCollection from "../models/otp_model.js";
import { sendEmail } from "../services/otp_service.js";

// ================= REGISTER =================
export const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        const existingUser = await AuthCollection.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "Email already exists" });

        const hash = await bcrypt.hash(password, 10);
        await AuthCollection.create({ name, email, password: hash, role });

        res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
export const login = async (req, res) => {
    try {
        const email = req.body.email.toLowerCase();
        const password = req.body.password;

        const user = await AuthCollection.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(401).json({ message: "Incorrect password" });

        // 🔹 Send OTP for all roles
        const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
        const hashedOtp = await bcrypt.hash(otp, 10);

        // Delete any previous OTPs
        await otpCollection.deleteMany({ email });

        // Save new OTP with expiry (5 min)
        await otpCollection.create({
            email,
            otp: hashedOtp,
            expiry: new Date(Date.now() + 5 * 60 * 1000),
        });

        // Send OTP email
        const sent = await sendEmail(email, otp);
        if (!sent) return res.status(500).json({ message: "Failed to send OTP" });

        // Respond to frontend: OTP sent
        res.json({ message: "OTP sent to email", email, role: user.role });

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

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
            maxAge: 60 * 60 * 1000
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

        // 1️⃣ Ensure logged-in user exists
        const user = await AuthCollection.findById(req.user.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        // 2️⃣ Verify old password
        const match = await bcrypt.compare(oldPassword, user.password);
        if (!match) return res.status(401).json({ message: "Old password is incorrect" });

        // 3️⃣ Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // 4️⃣ Update password
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ message: "Password changed successfully ✅" });

    } catch (err) {
        res.status(500).json({ message: "Server Error", error: err.message });
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

        const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
        const hashedOtp = await bcrypt.hash(otp, 10);

        // Delete any previous OTPs
        await otpCollection.deleteMany({ email });

        // Save new OTP with expiry
        await otpCollection.create({
            email,
            otp: hashedOtp,
            expiry: new Date(Date.now() + 5 * 60 * 1000) // 5 minutes
        });

        // Send OTP email
        const sent = await sendEmail(email, otp);
        if (!sent) return res.status(500).json({ message: "Failed to resend OTP" });

        res.json({ message: "OTP resent successfully" });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

