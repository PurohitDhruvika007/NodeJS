import express from "express";
import { getProfile, viewMyGrades, viewMyAttendance } from "../controllers/student_controllers.js";
import { verifyToken } from "../Middleware/auth_middleware.js";

const router = express.Router();

router.get("/profile", verifyToken, getProfile);
router.get("/grades", verifyToken, viewMyGrades);
router.get("/attendance", verifyToken, viewMyAttendance);


export default router;
