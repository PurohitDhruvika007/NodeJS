import express from "express";
import { uploads } from "../Middleware/multer.js";
import { verifyToken, isAdmin } from "../Middleware/auth_middleware.js";

import {
    getDashboard,
    getAllStudents,
    addStudent,
    getSingleStudent,
    updateStudent,
    deleteStudent,
    getAdminProfile,
    updateAdminProfile,
    changeAdminPassword,
    markAttendance,
    getAttendance,
    addGrade,
    getAnalytics,
    getGrades
} from "../controllers/admin_controllers.js";

const router = express.Router();

// 🔐 Protect ALL admin routes
router.use(verifyToken, isAdmin);

// Dashboard
router.get("/dashboard", getDashboard);
router.get("/analytics", getAnalytics);

// Students CRUD
router.get("/students", getAllStudents);
router.get("/students/:id", getSingleStudent);
router.post("/add-student", uploads.single("photo"), addStudent);
router.put("/update-student/:id", uploads.single("photo"), updateStudent);
router.delete("/delete-student/:id", deleteStudent);

// Admin profile
router.get("/profile", getAdminProfile);
router.put("/profile", uploads.single("photo"), updateAdminProfile);
router.put("/change-password", changeAdminPassword);

// Attendance
router.post("/add-attendance", markAttendance);
router.get("/attendance/:id", getAttendance);

// Grades
router.post("/add-grade", addGrade);
router.get("/grades/:id", getGrades);

export default router;
