import mongoose from "mongoose";
import bcrypt from "bcrypt";
import fs from "fs";
import path from "path";

import { studentCollection } from "../models/student_model.js";
import { gradeCollection } from "../models/grade_model.js";
import { AuthCollection } from "../models/auth_model.js";
import { attendanceCollection } from "../models/attendance_model.js";
import { adminCollection } from "../models/admin_model.js";

// ===============================
// 📊 ADMIN DASHBOARD
// ===============================
export const getDashboard = async (req, res) => {
    try {
        const totalStudents = await studentCollection.countDocuments();
        const totalAdmins = await adminCollection.countDocuments();
        const totalGrades = await gradeCollection.countDocuments();
        const totalAttendance = await attendanceCollection.countDocuments();

        res.json({
            totalStudents,
            totalAdmins,
            totalGrades,
            totalAttendance
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ===============================
// 📚 GET ALL STUDENTS (Pagination + Search)
// ===============================
export const getAllStudents = async (req, res) => {
    try {
        const { page = 1, limit = 5, search = "", className = "" } = req.query;

        const pageNumber = Number(page);
        const limitNumber = Number(limit);
        const skip = (pageNumber - 1) * limitNumber;

        let filter = {};

        // 🔍 Search by name, email (from Auth), course, roll_no
        if (search) {
            filter.$or = [
                { course: { $regex: search, $options: "i" } },
                { roll_no: { $regex: search, $options: "i" } }
            ];
        }

        // 🎓 Filter by class/course
        if (className) {
            filter.course = className;
        }

        const students = await studentCollection
            .find(filter)
            .populate("userId", "name email")
            .skip(skip)
            .limit(limitNumber)
            .sort({ createdAt: -1 });

        const total = await studentCollection.countDocuments(filter);

        res.json({
            totalStudents: total,
            currentPage: pageNumber,
            totalPages: Math.ceil(total / limitNumber),
            students
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ===============================
// ➕ ADD STUDENT (Auth + Student)
// ===============================
export const addStudent = async (req, res) => {
    try {
        const { name, email, password, course, roll_no, contact, address } = req.body;

        const exists = await AuthCollection.findOne({ email });
        if (exists) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newAuth = await AuthCollection.create({
            name,
            email,
            password: hashedPassword,
            role: "student"
        });

        const student = await studentCollection.create({
            userId: newAuth._id,
            course,
            roll_no,
            contact,
            address,
            photo: req.file?.filename
        });

        res.status(201).json({
            message: "Student created successfully",
            student
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ===============================
// 🔍 GET SINGLE STUDENT
// ===============================
export const getSingleStudent = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid student ID" });
        }

        const student = await studentCollection
            .findById(id)
            .populate("userId", "name email role");

        if (!student) return res.status(404).json({ message: "Student not found" });

        res.json(student);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ===============================
// ✏ UPDATE STUDENT
// ===============================
export const updateStudent = async (req, res) => {
    try {
        const { id } = req.params;

        const student = await studentCollection.findById(id);
        if (!student) return res.status(404).json({ message: "Student not found" });

        // Delete old photo if new uploaded
        if (req.file) {
            if (student.photo) {
                const oldPath = path.join("uploads", student.photo);
                if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
            }
            student.photo = req.file.filename;
        }

        Object.assign(student, req.body);
        await student.save();

        res.json({ message: "Student updated successfully", student });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ===============================
// ❌ DELETE STUDENT
// ===============================
export const deleteStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const student = await studentCollection.findById(id);
        if (!student) return res.status(404).json({ message: "Student not found" });

        // Delete photo
        if (student.photo) {
            const photoPath = path.join("uploads", student.photo);
            if (fs.existsSync(photoPath)) fs.unlinkSync(photoPath);
        }

        // Delete auth account
        await AuthCollection.findByIdAndDelete(student.userId);

        await studentCollection.findByIdAndDelete(id);

        res.json({ message: "Student deleted successfully" });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ===============================
// 👨‍💼 GET ADMIN PROFILE
// ===============================
export const getAdminProfile = async (req, res) => {
    try {
        const admin = await adminCollection
            .findOne({ userId: req.user.id })
            .populate("userId", "name email role");

        if (!admin) return res.status(404).json({ message: "Admin profile not found" });

        res.json(admin);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ===============================
// 👨‍💼 UPDATE ADMIN PROFILE
// ===============================
export const updateAdminProfile = async (req, res) => {
    try {
        const admin = await adminCollection.findOne({ userId: req.user.id });
        if (!admin) return res.status(404).json({ message: "Admin not found" });

        // Update Auth
        await AuthCollection.findByIdAndUpdate(
            req.user.id,
            { name: req.body.name, email: req.body.email }
        );

        // Delete old photo if new uploaded
        if (req.file) {
            if (admin.photo) {
                const oldPath = path.join("uploads", admin.photo);
                if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
            }
            admin.photo = req.file.filename;
        }

        admin.department = req.body.department || admin.department;
        admin.phone = req.body.phone || admin.phone;
        admin.address = req.body.address || admin.address;

        await admin.save();

        res.json({ message: "Admin profile updated successfully", admin });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ===============================
// 🔑 CHANGE ADMIN PASSWORD
// ===============================
export const changeAdminPassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;

        const user = await AuthCollection.findById(req.user.id);
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) return res.status(400).json({ message: "Old password incorrect" });

        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();

        res.json({ message: "Password updated successfully" });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ===============================
// 📅 MARK ATTENDANCE
// ===============================
export const markAttendance = async (req, res) => {
    try {
        const record = await attendanceCollection.create(req.body);
        res.status(201).json(record);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ===============================
// 📅 GET ATTENDANCE
// ===============================
export const getAttendance = async (req, res) => {
    try {
        const data = await attendanceCollection.find({ studentId: req.params.id });
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ===============================
// 📝 ADD GRADE
// ===============================
export const addGrade = async (req, res) => {
    try {
        const grade = await gradeCollection.create(req.body);
        res.status(201).json(grade);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ===============================
// 📝 GET GRADES
// ===============================
export const getGrades = async (req, res) => {
    try {
        const grades = await gradeCollection.find({ studentId: req.params.id });
        res.json(grades);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
