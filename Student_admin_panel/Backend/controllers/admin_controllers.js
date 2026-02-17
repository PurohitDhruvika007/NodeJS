import mongoose from "mongoose";
import bcrypt from "bcrypt";
import fs from "fs";
import path from "path";

import { studentCollection } from "../models/student_model.js";
import { gradeCollection } from "../models/grade_model.js";
import { AuthCollection } from "../models/auth_model.js";
import { attendanceCollection } from "../models/attendance_model.js";
import { adminCollection } from "../models/admin_model.js";

// =====================================================
// ================= ADMIN DASHBOARD ===================
// =====================================================
export const getDashboard = async (req, res) => {
    try {
        const totalStudents = await studentCollection.countDocuments();
        const totalAdmins = await AuthCollection.countDocuments({ role: "admin" });
        const totalGrades = await gradeCollection.countDocuments();

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const presentToday = await attendanceCollection.countDocuments({
            date: { $gte: today },
            status: "present"
        });

        const absentToday = await attendanceCollection.countDocuments({
            date: { $gte: today },
            status: "absent"
        });

        const attendancePercentage =
            totalStudents > 0
                ? ((presentToday / totalStudents) * 100).toFixed(1)
                : 0;

        res.json({
            totalStudents,
            totalAdmins,
            totalGrades,
            presentToday,
            absentToday,
            attendancePercentage
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
export const getAnalytics = async (req, res) => {
    try {
        // 1️⃣ Grades distribution
        const gradesStats = await gradeCollection.aggregate([
            {
                $group: {
                    _id: "$grade",   // e.g., "A", "B", "C"
                    count: { $sum: 1 },
                }
            },
            { $sort: { _id: 1 } }
        ]);

        // 2️⃣ Attendance distribution
        const attendanceStats = await studentCollection.aggregate([
            {
                $project: {
                    attendance: 1,
                    status: {
                        $cond: [{ $gte: ["$attendance", 75] }, "Above75", "Below75"]
                    }
                }
            },
            {
                $group: {
                    _id: "$status",
                    count: { $sum: 1 }
                }
            }
        ]);

        res.json({ gradesStats, attendanceStats });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
//===================================================
// ================= STUDENT CRUD ======================
// =====================================================
export const addStudent = async (req, res) => {
    try {
        const { name, email, password, course, roll_no, contact, address } = req.body;

        const exists = await AuthCollection.findOne({ email });
        if (exists) return res.status(400).json({ message: "Email already exists" });

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

        res.status(201).json({ message: "Student created successfully", student });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getAllStudents = async (req, res) => {
    try {
        const students = await studentCollection
            .find()
            .populate("userId", "name email");

        res.json(students);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const updateStudent = async (req, res) => {
    try {
        const { id } = req.params;

        const student = await studentCollection.findById(id);
        if (!student) return res.status(404).json({ message: "Student not found" });

        const authUser = await AuthCollection.findById(student.userId);

        if (req.body.name) authUser.name = req.body.name;
        if (req.body.email) authUser.email = req.body.email;
        await authUser.save();

        if (req.file && student.photo) {
            const oldPath = path.join("uploads", student.photo);
            if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
            student.photo = req.file.filename;
        }

        student.course = req.body.course || student.course;
        student.roll_no = req.body.roll_no || student.roll_no;
        student.contact = req.body.contact || student.contact;
        student.address = req.body.address || student.address;

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

// =====================================================
// ================= ATTENDANCE SYSTEM =================
// =====================================================
export const markAttendance = async (req, res) => {
    try {
        const { studentId, date, status } = req.body;
        const selectedDate = new Date(date);
        selectedDate.setHours(0, 0, 0, 0);

        const existing = await attendanceCollection.findOne({
            studentId,
            date: selectedDate
        });

        if (existing) {
            existing.status = status;
            await existing.save();
            return res.status(200).json({ message: "Attendance updated" });
        }

        const record = await attendanceCollection.create({
            studentId,
            date: selectedDate,
            status
        });

        res.status(201).json({ message: "Attendance marked", record });
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

export const getAttendanceSummary = async (req, res) => {
    try {
        const summary = await attendanceCollection.aggregate([
            {
                $group: {
                    _id: "$studentId",
                    total: { $sum: 1 },
                    present: { $sum: { $cond: [{ $eq: ["$status", "present"] }, 1, 0] } }
                }
            }
        ]);

        const formatted = await Promise.all(
            summary.map(async (item) => {
                const student = await studentCollection
                    .findById(item._id)
                    .populate("userId", "name");

                const percentage = item.total > 0 ? ((item.present / item.total) * 100).toFixed(1) : 0;

                return {
                    studentId: item._id,
                    name: student?.userId?.name,
                    total: item.total,
                    present: item.present,
                    percentage
                };
            })
        );

        res.json(formatted);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ✅ Add grade (prevent duplicate subject per term)
export const addGrade = async (req, res) => {
    try {
        const { studentId, subject, marks, term } = req.body;

        if (!studentId || !subject || marks == null || !term)
            return res.status(400).json({ message: "All fields are required" });

        if (marks < 0 || marks > 100)
            return res.status(400).json({ message: "Marks must be between 0 and 100" });

        const studentExists = await studentCollection.findById(studentId);
        if (!studentExists)
            return res.status(404).json({ message: "Student not found" });

        const existingGrade = await gradeCollection.findOne({ studentId, subject, term });

        if (existingGrade) {
            return res.status(400).json({
                message: "Grade already exists for this subject and term. Use update."
            });
        }

        const grade = await gradeCollection.create({
            studentId,
            subject,
            marks,
            term
        });

        res.status(201).json({ message: "Grade added successfully", grade });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
// ✅ Update grade by ID
export const updateGrade = async (req, res) => {
    try {
        const { id } = req.params;
        const { subject, marks, term } = req.body;

        if (!subject || marks == null || !term)
            return res.status(400).json({ message: "All fields are required" });

        if (marks < 0 || marks > 100)
            return res.status(400).json({ message: "Marks must be between 0 and 100" });

        const grade = await gradeCollection.findByIdAndUpdate(
            id,
            { subject, marks, term },
            { new: true }
        );

        if (!grade)
            return res.status(404).json({ message: "Grade not found" });

        res.json({ message: "Grade updated successfully", grade });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


// ✅ Get grades for a student with average + letter
export const getGrades = async (req, res) => {
    try {
        const grades = await gradeCollection.find({ studentId: req.params.id });

        const totalMarks = grades.reduce((sum, g) => sum + g.marks, 0);
        const average = grades.length
            ? (totalMarks / grades.length).toFixed(2)
            : 0;

        const formattedGrades = grades.map(g => ({
            ...g._doc,
            letter:
                g.marks >= 90 ? "A+" :
                    g.marks >= 80 ? "A" :
                        g.marks >= 70 ? "B" :
                            g.marks >= 60 ? "C" : "D"
        }));

        res.json({ grades: formattedGrades, average });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ✅ Delete grade
export const deleteGrade = async (req, res) => {
    try {
        const { id } = req.params;
        const grade = await gradeCollection.findByIdAndDelete(id);
        if (!grade) return res.status(404).json({ message: "Grade not found" });
        res.json({ message: "Grade deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


// ================= ADMIN PROFILE =====================
export const getAdminProfile = async (req, res) => {
    try {
        // 1️⃣ Get auth document first
        const authAdmin = await AuthCollection.findById(req.user.id).select("-password");
        if (!authAdmin) return res.status(404).json({ message: "Admin not found" });

        // 2️⃣ Get adminCollection document
        const adminData = await adminCollection.findOne({ userId: req.user.id });

        // 3️⃣ Combine both into one response
        const profile = {
            ...authAdmin._doc,
            department: adminData?.department || "",
            designation: adminData?.designation || "",
            phone: adminData?.phone || "",
            emergencyContact: adminData?.emergencyContact || "",
            gender: adminData?.gender || "",
            dob: adminData?.dob ? adminData.dob.toISOString().split("T")[0] : "",
            address: adminData?.address || "",
            bio: adminData?.bio || "",
            status: adminData?.status || "active",
            photo: adminData?.photo || ""
        };

        res.status(200).json(profile);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const updateAdminProfile = async (req, res) => {
    try {
        const { name, email } = req.body;

        // 1️⃣ Update AuthCollection
        const updatedAuth = await AuthCollection.findByIdAndUpdate(
            req.user.id,
            { name, email },
            { new: true }
        ).select("-password");

        // 2️⃣ Update adminCollection
        const updateData = {
            department: req.body.department,
            designation: req.body.designation,
            phone: req.body.phone,
            emergencyContact: req.body.emergencyContact,
            gender: req.body.gender,
            dob: req.body.dob,
            address: req.body.address,
            bio: req.body.bio,
            status: req.body.status,
        };

        if (req.file) updateData.photo = req.file.filename; // use filename

        const updatedAdmin = await adminCollection.findOneAndUpdate(
            { userId: req.user.id },
            updateData,
            { new: true }
        );

        // 3️⃣ Combine response
        const profile = {
            ...updatedAuth._doc,
            ...updatedAdmin._doc,
        };

        res.status(200).json(profile);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};


export const changeAdminPassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;

        const admin = await AuthCollection.findById(req.user.id);
        if (!admin) return res.status(404).json({ message: "Admin not found" });

        const isMatch = await bcrypt.compare(oldPassword, admin.password);
        if (!isMatch) return res.status(400).json({ message: "Old password is incorrect" });

        admin.password = await bcrypt.hash(newPassword, 10);
        await admin.save();

        res.status(200).json({ message: "Password changed successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};
