import { Auth } from "../models/AuthModels.js";
import bcrypt from "bcrypt";

export const signup = async (req, res) => {
    try {
        const { email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await Auth.create({ email, password: hashedPassword });
        res.json({ message: "user registered successfully", result });
    }
    catch (err) {
        res.json({ message: "user not registered", err });
    }
}
export const signin = async (req, res) => {
    res.json({ message: "user signin successfully", user: req.user })
}
export const signout = async (req, res) => {
    req.logout(() => {
        res.json({ message: "sign out successfully" });
    })
}
export const homepage = async (req, res) => {
    res.json({ message: "welcome to home page", user: req.user })
}