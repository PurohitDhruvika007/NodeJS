import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { AuthCollection } from "../models/authModels.js";
import { sendOTP } from "../services/otpServices.js"
import { OtpCollection } from "../models/otpModels.js";
import jwt from "jsonwebtoken"
dotenv.config();

export const signup = async (req, res) => {

    const { email, password } = req.body;

    try {
        const hashed = await bcrypt.hash(password, 12);
        await AuthCollection.create({ email, password: hashed });
        res.json({ status: true, message: "registered successfully!!" });
    }
    catch (err) {
        res.json({ status: false, message: "registration failed" });
    }

}
export const signin = async (req, res) => {
    const { email, password } = req.body;
    const user = await AuthCollection.findOne({ email });
    if (!user) {
        return res.json({ status: false, message: "user not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.json({ status: false, message: "password is incorrect" });
    }
    const status = await sendOTP(email);
    if (status) {
        res.json({ status: true, message: "OTP sent successfully" });
    }
    else {
        res.json({ status: false, message: "OTP not sent" })
    }
}

export const verifyOTP = async (req, res) => {
    const { email, otp } = req.body;
    const result = await OtpCollection.findOne({ email, otp });
    if (!result) {
        return res.json({ status: false, message: "OTP is incorrect" });
    }
    if (result.expiry < new Date(Date.now())) {
        return res.json({ status: false, message: "OTP is expired" });
    }
    await OtpCollection.deleteMany({ email });
    try {
        const user = await AuthCollection.findOne({ email });
        const token = jwt.sign({ user: user._id }, process.env.SECRET_KEY, {
            expiresIn: "1h"
        });
        res.cookie("auth_token", token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60
        })
        res.json({ status: true, message: "OTP sent successfully" });
    }
    catch (err) {
        res.json({ status: false, message: "OTP verification failed" })
    }
}

export const signout = async (req, res) => {
    res.clearCookie("auth_token");
    res.json({ status: true, message: "sign out successfully" });
}

export const checkLoginStatus = async (req, res) => {
    try {
        const token = req.cookies.auth_token;
        if (!token) {
            return res.json({ status: false, message: "sign out" });
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY, { expiresIn: "1h" });
        res.json({ status: true, message: "already login", user: decoded.payload });
    }
    catch (err) {
        res.json({ status: false, message: "login first" });
    }
}

export const changePassword = async (req, res) => {
    const { email, oldPassword, newPassword } = req.body;
    try {
        const user = await AuthCollection.findOne({ email });
        if (!user) {
            return res.json({ status: false, message: "user not found" });
        }
        const isMatch = await bcrypt.compare(oldPassword, user.password)
        if (!isMatch) {
            return res.json({ status: false, message: "password is incorrect" });
        }
        const hashed = await bcrypt.hash(newPassword, 12);
        await AuthCollection.updateOne({ email }, {
            $set: {
                password: hashed
            }
        })
        res.json({ status: true, message: "password changed successfully" });
    }
    catch (err) {
        res.json({ status: false, message: err.message })
    }
}


export const forgetPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await AuthCollection.findOne({ email });
        if (!user) {
            return res.json({ status: false, message: "user not found" });
        }
        const status = await sendOTP(email);
        res.json(status)
    }
    catch (err) {
        res.json({ status: false, message: err.message });
    }
}

export const changeForgetPassword = async (req, res) => {
    const { email, otp, password } = req.body;
    try {
        const result = await OtpCollection.findOne({ email, otp });
        if (!result) {
            return res.json({ status: false, message: "user not found" });
        }
        if (result.expiry < new Date(Date.now())) {
            return res.json({ status: false, message: "otp expired!" });
        }
        const hashed = await bcrypt.hash(password, 12);
        await AuthCollection.updateOne({ email }, {
            $set: {
                password: hashed
            }
        })
        res.json({ status: true, message: "password changed successfully" });
    }
    catch (err) {
        res.json({ status: false, message: err.message });
    }
}

