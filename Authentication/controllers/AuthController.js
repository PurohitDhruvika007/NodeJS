import { Auth } from "../models/AuthModels.js";
import { homePath, signInPath, signUpPath } from "../server.js";
import bcrypt from "bcrypt";

export const signUp = async (req, res) => {
    try {
        const { email, password, name, phone } = req.body;
        const exist = await Auth.findOne({ email });
        if (exist) {
            return res.json("user already exists");
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await Auth.create(
            {
                email,
                name,
                phone,
                password: hashedPassword
            }
        )
        res.json({ message: "user sign in successfull", result });
    }
    catch (err) {
        res.json({ message: "user not sign up", err });
    }
}
export const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Auth.findOne({ email });
        if (!user) {
            return res.json({ message: "first sign up" });
        }
        const isMatch = bcrypt.compare(password, user.password);
        if (!isMatch) {

            return res.json({ message: "enter valid credential" });
        }

        res.cookie("auth_token", true, { maxAge: 1000 * 60 * 60, httpOnly: true });

        return res.json({ message: "user sign in successfully" });


    }
    catch (err) {
        res.json({ message: "user not sign in", err });
    }
}

export const homePage = async (req, res) => {
    try {
        // const user = await Auth.find();
        // res.json({ message: "welcome to home page", user });
        res.sendFile(homePath);
    }
    catch (err) {
        res.json({ message: "404 page not loaded", err });
    }
}

export const signInPage = async (req, res) => {
    try {
        // const user = await Auth.find();
        // res.json({ message: "welcome to home page", user });
        res.sendFile(signInPath);
    }
    catch (err) {
        res.json({ message: "404 page not loaded", err });
    }
}

export const signUpPage = async (req, res) => {
    try {
        // const user = await Auth.find();
        // res.json({ message: "welcome to home page", user });
        res.sendFile(signUpPath);
    }
    catch (err) {
        res.json({ message: "404 page not loaded", err });
    }
}