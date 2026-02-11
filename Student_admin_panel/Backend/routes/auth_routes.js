import express from "express";
import { login, register, verifyOtp, forgotPassword, resetPassword, changePassword, logout, resendOtp } from "../controllers/auth_controllers.js";
import { verifyToken } from "../Middleware/auth_middleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/verify-otp", verifyOtp);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.post("/change-password", verifyToken, changePassword);
router.post("/logout", verifyToken, logout);
router.post("/resend-otp", resendOtp);


export default router;
