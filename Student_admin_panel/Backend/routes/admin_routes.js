import express from "express";
import { uploads } from "../Middleware/multer.js";
import { verifyToken, isAdmin } from "../Middleware/auth_middleware.js";

import {
    getDashboard,
    getAllStudents,
    addStudent,
    updateStudent,
    deleteStudent,
    getAdminProfile,
    updateAdminProfile,
    changeAdminPassword,
    markAttendance,
    getAttendance,
    addGrade,
    updateGrade,
    deleteGrade,
    getAnalytics,
    getGrades,
    getAttendanceSummary
} from "../controllers/admin_controllers.js";

const router = express.Router();

// 🔐 Protect ALL admin routes
router.use(verifyToken, isAdmin);

/* ================= DASHBOARD ================= */
router.get("/dashboard", getDashboard);
router.get("/analytics", getAnalytics);

/* ================= STUDENTS ================= */
router.get("/students", getAllStudents);             // Get all students
router.post("/students", uploads.single("photo"), addStudent); // Add student
router.put("/students/:id", uploads.single("photo"), updateStudent); // Update student
router.delete("/students/:id", deleteStudent);       // Delete student

/* ================= ADMIN PROFILE ================= */
router.get("/profile", getAdminProfile);            // Get profile
router.put("/profile", uploads.single("photo"), updateAdminProfile); // Update profile
router.put("/change-password", changeAdminPassword); // Change password

/* ================= ATTENDANCE ================= */
router.post("/attendance", markAttendance);         // Mark attendance
router.get("/attendance/:id", getAttendance);      // Get attendance of a student
router.get("/attendance-summary", getAttendanceSummary); // Attendance summary


/* ================= GRADES ================= */

// Add grade
router.post("/grades", addGrade);

// Update grade by ID
router.put("/grades/:id", updateGrade);

// Get grades for a student
router.get("/grades/:id", getGrades);

// Delete grade
router.delete("/grades/:id", deleteGrade);


export default router;
