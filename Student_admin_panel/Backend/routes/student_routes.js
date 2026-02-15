import express from "express";
import {
    getProfile,
    getStudentDashboard,
    viewMyGrades,
    viewMyAttendance,
    getPerformanceGraph
} from "../controllers/student_controllers.js";

import { verifyToken, isStudent } from "../Middleware/auth_middleware.js";

const router = express.Router();

// 🔐 Protect ALL student routes
router.use(verifyToken, isStudent);

router.get("/profile", getProfile);
router.get("/dashboard", getStudentDashboard);
router.get("/grades", viewMyGrades);
router.get("/attendance", viewMyAttendance);
router.get("/performance-graph", getPerformanceGraph);

export default router;
