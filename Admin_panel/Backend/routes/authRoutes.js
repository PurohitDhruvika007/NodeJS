import express from "express";
import { changeForgetPassword, changePassword, checkLoginStatus, forgetPassword, signin, signout, signup, verifyOTP } from "../controllers/authControllers.js";
const router = express.Router();

router.post("/signin", signin);
router.get("/signout", signout);
router.get("/checkLogin", checkLoginStatus);
router.post("/changePassword", changePassword);
router.post("/forgetPassword", forgetPassword);
router.post("/changeForgetPassword", changeForgetPassword);

router.post("/signup", signup);
router.post("/verifyOtp", verifyOTP);

export default router;