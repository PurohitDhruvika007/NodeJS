import express from "express";
import { signIn, signUp, logout } from "../controllers/AuthControllers.js";
import { sendOTP, verifyOTP } from "../controllers/OtpControllers.js";

const router = express.Router();

// user registration
router.post("/register", signUp);

// login user
router.post("/login", signIn);

// logout user
router.post("/logout", logout);

// send otp
router.post("/send-otp", sendOTP);

// verify otp
router.post("/verify-otp", verifyOTP);

export default router;
