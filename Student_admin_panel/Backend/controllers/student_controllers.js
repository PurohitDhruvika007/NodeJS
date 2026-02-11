import { studentCollection } from "../models/student_model.js";
import { gradeCollection } from "../models/grade_model.js";
import { attendanceCollection } from "../models/attendance_model.js";

// ===============================
// 👤 STUDENT PROFILE
// ===============================
export const getProfile = async (req, res) => {
    try {
        const profile = await studentCollection
            .findOne({ userId: req.user.id })
            .populate("userId", "name email role");

        if (!profile) {
            return res.status(404).json({ message: "Profile not found" });
        }

        res.json(profile);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


// ===============================
// 📊 STUDENT DASHBOARD
// ===============================
export const getStudentDashboard = async (req, res) => {
    try {
        const student = await studentCollection.findOne({ userId: req.user.id });

        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        const grades = await gradeCollection.find({ studentId: student._id });
        const attendance = await attendanceCollection.find({ studentId: student._id });

        // Total subjects
        const totalSubjects = grades.length;

        // Average marks
        let averageMarks = 0;
        if (grades.length > 0) {
            const totalMarks = grades.reduce((sum, g) => sum + g.marks, 0);
            averageMarks = totalMarks / grades.length;
        }

        // Attendance %
        let attendancePercentage = 0;
        if (attendance.length > 0) {
            const presentCount = attendance.filter(a => a.status === "Present").length;
            attendancePercentage = (presentCount / attendance.length) * 100;
        }

        res.json({
            totalSubjects,
            averageMarks: averageMarks.toFixed(2),
            attendancePercentage: attendancePercentage.toFixed(2)
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


// ===============================
// 📝 VIEW MY GRADES
// ===============================
export const viewMyGrades = async (req, res) => {
    try {
        const student = await studentCollection.findOne({ userId: req.user.id });

        const grades = await gradeCollection.find({ studentId: student._id });

        res.json(grades);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


// ===============================
// 📅 VIEW MY ATTENDANCE
// ===============================
export const viewMyAttendance = async (req, res) => {
    try {
        const student = await studentCollection.findOne({ userId: req.user.id });

        const data = await attendanceCollection.find({ studentId: student._id });

        res.json(data);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


// ===============================
// 📈 PERFORMANCE GRAPH DATA
// ===============================
export const getPerformanceGraph = async (req, res) => {
    try {
        const student = await studentCollection.findOne({ userId: req.user.id });

        const grades = await gradeCollection.find({ studentId: student._id });

        // Format for frontend chart
        const graphData = grades.map(g => ({
            subject: g.subject,
            marks: g.marks
        }));

        res.json(graphData);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
