import { sendMail } from "../controllers/OtpControllers.js";
import express from "express";
const router = express.Router();

router.post("/", sendMail);

export default router;