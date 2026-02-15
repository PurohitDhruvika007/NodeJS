import express from "express";
import {
    login,
    register,
    checkLogin,
    verifyOtp,
    forgotPassword,
    resetPassword,
    changePassword,
    logout,
    resendOtp
} from "../controllers/auth_controllers.js";

import { verifyToken } from "../Middleware/auth_middleware.js";

const router = express.Router();

// Public Routes
router.post("/register", register);
router.post("/login", login);
router.post("/verify-otp", verifyOtp);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.post("/resend-otp", resendOtp);

// Protected Routes
router.get("/check-login", verifyToken, checkLogin);
router.put("/change-password", verifyToken, changePassword);
router.post("/logout", verifyToken, logout);

export default router;
