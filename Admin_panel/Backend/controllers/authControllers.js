import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { AuthCollection } from "../models/authModels.js";
import { sendOTP } from "../services/otpServices.js"

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
    const status = sendOTP(email);
    if (status) {
        res.json({ status: true, message: "OTP sent successfully" });
    }
    else {
        res.json({ status: false, message: "OTP not sent" })
    }
}

export const verifyOTP = async (req, res) => {

}

export const signout = async (req, res) => {

}

