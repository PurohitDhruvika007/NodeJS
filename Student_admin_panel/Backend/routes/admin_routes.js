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
    getGrades
} from "../controllers/admin_controllers.js";

const router = express.Router();

// Dashboard
router.get("/dashboard", verifyToken, isAdmin, getDashboard);

// Students CRUD
router.get("/students", verifyToken, isAdmin, getAllStudents);
router.get("/students/:id", verifyToken, isAdmin, getSingleStudent);
router.post("/add-student", verifyToken, isAdmin, uploads.single("photo"), addStudent);
router.put("/update-student/:id", verifyToken, isAdmin, uploads.single("photo"), updateStudent);
router.delete("/delete-student/:id", verifyToken, isAdmin, deleteStudent);

// Admin profile
router.get("/profile", verifyToken, isAdmin, getAdminProfile);
router.put("/profile", verifyToken, isAdmin, uploads.single("photo"), updateAdminProfile);
router.put("/change-password", verifyToken, isAdmin, changeAdminPassword);

// Attendance
router.post("/add-attendance", verifyToken, isAdmin, markAttendance);
router.get("/attendance/:id", verifyToken, isAdmin, getAttendance);

// Grades
router.post("/add-grade", verifyToken, isAdmin, addGrade);
router.get("/grades/:id", verifyToken, isAdmin, getGrades);

export default router;
