// import { sendMail } from "../controllers/OtpControllers.js";
// import express from "express";
// const router = express.Router();

// router.post("/", sendMail);

// export default router;

import express from "express";
import { sendOtp, verifyOtp } from "../controllers/OtpControllers.js";

const router = express.Router();

router.post("/send", sendOtp);
router.post("/verify", verifyOtp);

export default router;

