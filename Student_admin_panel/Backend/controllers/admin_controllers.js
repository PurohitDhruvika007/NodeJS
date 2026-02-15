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

        res.json({ totalStudents, totalAdmins, totalGrades, totalAttendance });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ===============================
// 📊 ADMIN ANALYTICS
// ===============================
export const getAnalytics = async (req, res) => {
    try {
        const studentsByCourse = await studentCollection.aggregate([
            { $group: { _id: "$course", count: { $sum: 1 } } }
        ]);

        const attendanceStats = await attendanceCollection.aggregate([
            { $group: { _id: "$status", count: { $sum: 1 } } }
        ]);

        const gradesStats = await gradeCollection.aggregate([
            { $group: { _id: "$marks", count: { $sum: 1 } } }
        ]);

        res.json({ studentsByCourse, attendanceStats, gradesStats });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


// ================= ADMIN PROFILE =================

export const getAdminProfile = async (req, res) => {
    try {
        // req.user comes from verifyToken middleware
        const admin = await AuthCollection.findById(req.user._id).select("-password");

        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }

        res.status(200).json(admin);

    } catch (error) {
        console.error("Admin Profile Error:", error);
        res.status(500).json({ message: "Server error" });
    }
};



// ================= UPDATE ADMIN PROFILE =================

export const updateAdminProfile = async (req, res) => {
    try {
        const { name, email } = req.body;

        const updatedData = {
            name,
            email,
        };

        if (req.file) {
            updatedData.photo = req.file.filename;
        }

        const updatedAdmin = await AuthCollection.findByIdAndUpdate(
            req.user._id,
            updatedData,
            { new: true }
        ).select("-password");

        res.status(200).json(updatedAdmin);

    } catch (error) {
        console.error("Update Admin Error:", error);
        res.status(500).json({ message: "Server error" });
    }
};



// ================= CHANGE ADMIN PASSWORD =================

export const changeAdminPassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;

        const admin = await AuthCollection.findById(req.user._id);

        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }

        const isMatch = await bcrypt.compare(oldPassword, admin.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Old password incorrect" });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        admin.password = hashedPassword;
        await admin.save();

        res.status(200).json({ message: "Password changed successfully" });

    } catch (error) {
        console.error("Change Password Error:", error);
        res.status(500).json({ message: "Server error" });
    }
};


// ===============================
// 👩‍🎓 STUDENT CRUD
// ===============================
export const getAllStudents = async (req, res) => {
    try {
        const { page = 1, limit = 5, search = "", className = "" } = req.query;
        const skip = (page - 1) * limit;
        const filter = {};

        if (search) filter.$or = [
            { course: { $regex: search, $options: "i" } },
            { roll_no: { $regex: search, $options: "i" } }
        ];
        if (className) filter.course = className;

        const students = await studentCollection
            .find(filter)
            .populate("userId", "name email")
            .skip(skip)
            .limit(Number(limit))
            .sort({ createdAt: -1 });

        const total = await studentCollection.countDocuments(filter);

        res.json({
            totalStudents: total,
            currentPage: Number(page),
            totalPages: Math.ceil(total / limit),
            students
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const addStudent = async (req, res) => {
    try {
        const { name, email, password, course, roll_no, contact, address } = req.body;

        const exists = await AuthCollection.findOne({ email });
        if (exists) return res.status(400).json({ message: "Email already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newAuth = await AuthCollection.create({ name, email, password: hashedPassword, role: "student" });

        const student = await studentCollection.create({
            userId: newAuth._id,
            course, roll_no, contact, address,
            photo: req.file?.filename
        });

        res.status(201).json({ message: "Student created successfully", student });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getSingleStudent = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: "Invalid ID" });

        const student = await studentCollection.findById(id).populate("userId", "name email role");
        if (!student) return res.status(404).json({ message: "Student not found" });

        res.json(student);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const updateStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const student = await studentCollection.findById(id);
        if (!student) return res.status(404).json({ message: "Student not found" });

        if (req.file && student.photo) {
            const oldPath = path.join("uploads", student.photo);
            if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
            student.photo = req.file.filename;
        }

        Object.assign(student, req.body);
        await student.save();

        res.json({ message: "Student updated successfully", student });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const deleteStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const student = await studentCollection.findById(id);
        if (!student) return res.status(404).json({ message: "Student not found" });

        if (student.photo) {
            const photoPath = path.join("uploads", student.photo);
            if (fs.existsSync(photoPath)) fs.unlinkSync(photoPath);
        }

        await AuthCollection.findByIdAndDelete(student.userId);
        await studentCollection.findByIdAndDelete(id);

        res.json({ message: "Student deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ===============================
// 📝 GRADES & ATTENDANCE
// ===============================
export const addGrade = async (req, res) => {
    try {
        const grade = await gradeCollection.create(req.body);
        res.status(201).json(grade);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getGrades = async (req, res) => {
    try {
        const grades = await gradeCollection.find({ studentId: req.params.id });
        res.json(grades);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const markAttendance = async (req, res) => {
    try {
        const record = await attendanceCollection.create(req.body);
        res.status(201).json(record);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getAttendance = async (req, res) => {
    try {
        const data = await attendanceCollection.find({ studentId: req.params.id });
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
