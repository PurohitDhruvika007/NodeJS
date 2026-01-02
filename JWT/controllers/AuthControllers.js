import { Auth } from "../models/AuthModels.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

export const signup = async (req, res) => {
    const { email, password } = req.body;
    const exist = await Auth.findOne({ email });
    if (exist) {
        return res.json({ message: "users has already signed up" });
    }
    const hashedPassword = bcrypt.hash(password, 10);
    const user = await Auth.create({ email, password: hashedPassword });
    res.json({ message: "user registered successfully", user });
}

export const signin = async (req, res) => {
    const { email, password } = req.body;
    const exist = await Auth.findOne({ email });
    if (!exist) {
        return res.json({ message: "user not found" });
    }
    const isMatch = await bcrypt.compare(password, exist.password);
    if (!isMatch) {
        return res.json({ message: "password is incorrect" });
    }

}