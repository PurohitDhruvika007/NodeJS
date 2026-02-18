import { studentCollection } from "../models/student_model.js";
import { gradeCollection } from "../models/grade_model.js";
import { attendanceCollection } from "../models/attendance_model.js";

// STUDENT PROFILE
export const getProfile = async (req, res) => {
    try {
        const profile = await studentCollection.findOne({ userId: req.user.id }).populate("userId", "name email role");
        if (!profile) return res.status(404).json({ message: "Profile not found" });
        res.json(profile);
    } catch (err) { res.status(500).json({ message: err.message }); }
};

// STUDENT DASHBOARD
export const getStudentDashboard = async (req, res) => {
    try {
        const student = await studentCollection.findOne({ userId: req.user.id });
        if (!student) return res.status(404).json({ message: "Student not found" });

        const grades = await gradeCollection.find({ studentId: student._id });
        const attendance = await attendanceCollection.find({ studentId: student._id });

        const totalSubjects = grades.length;
        const averageMarks = grades.length ? grades.reduce((sum, g) => sum + g.marks, 0) / grades.length : 0;
        const attendancePercentage = attendance.length
            ? (attendance.filter(a => a.status === "present").length / attendance.length) * 100
            : 0;

        res.json({ totalSubjects, averageMarks: averageMarks.toFixed(2), attendancePercentage: attendancePercentage.toFixed(2) });
    } catch (err) { res.status(500).json({ message: err.message }); }
};

export const viewMyGrades = async (req, res) => {
    try {
        const student = await studentCollection.findOne({ userId: req.user.id });
        if (!student) return res.status(404).json({ message: "Student not found" });

        const grades = await gradeCollection.find({ studentId: student._id });

        // Group grades by term
        const termData = {};

        grades.forEach((g) => {
            const term = g.term || "Term 1"; // default term
            if (!termData[term]) termData[term] = [];
            termData[term].push(g);
        });

        const result = [];

        for (const [term, termGrades] of Object.entries(termData)) {
            // If maxMarks does not exist, assume 100
            const totalMarks = termGrades.reduce((sum, g) => sum + g.marks, 0);
            const maxMarks = termGrades.reduce((sum, g) => sum + (g.maxMarks || 100), 0); // <- fix here

            const percentage = maxMarks ? (totalMarks / maxMarks) * 100 : 0;

            let grade = "F";
            if (percentage >= 90) grade = "A+";
            else if (percentage >= 80) grade = "A";
            else if (percentage >= 70) grade = "B+";
            else if (percentage >= 60) grade = "B";
            else if (percentage >= 50) grade = "C";
            else grade = "F";

            result.push({
                term,
                grades: termGrades.map(g => ({
                    subject: g.subject,
                    marks: g.marks,
                    maxMarks: g.maxMarks || 100 // default to 100
                })),
                totalMarks,
                maxMarks,
                percentage: percentage.toFixed(2),
                grade
            });
        }

        res.json(result);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};



export const viewMyAttendance = async (req, res) => {
    const student = await studentCollection.findOne({ userId: req.user.id });
    const data = await attendanceCollection.find({ studentId: student._id });
    res.json(data);
};

export const getPerformanceGraph = async (req, res) => {
    const student = await studentCollection.findOne({ userId: req.user.id });
    const grades = await gradeCollection.find({ studentId: student._id });
    res.json(grades.map(g => ({ subject: g.subject, marks: g.marks })));
};
