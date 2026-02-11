import express from "express";
import {
    getProfile,
    getStudentDashboard,
    viewMyGrades,
    viewMyAttendance,
    getPerformanceGraph
} from "../controllers/student_controllers.js";

import { verifyToken } from "../Middleware/auth_middleware.js";

const router = express.Router();

router.get("/profile", verifyToken, getProfile);
router.get("/dashboard", verifyToken, getStudentDashboard);
router.get("/grades", verifyToken, viewMyGrades);
router.get("/attendance", verifyToken, viewMyAttendance);
router.get("/performance-graph", verifyToken, getPerformanceGraph);

export default router;
