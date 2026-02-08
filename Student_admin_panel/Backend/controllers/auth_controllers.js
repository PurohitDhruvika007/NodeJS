import { AuthCollection } from "../models/auth_model.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import dotenv from "dotenv"
import { generateOTP } from "../services/otp_service.js";

dotenv.config()


export const signIn = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await AuthCollection.findOne({ email });
        if (!user) {
            return res.json({ status: false, message: "user not found" });
        }
        if (user.password != password) {
            return res.json({ status: false, message: "password is incorrect" });
        }
        sendOTP(email);

    }
    catch (err) {

    }
}