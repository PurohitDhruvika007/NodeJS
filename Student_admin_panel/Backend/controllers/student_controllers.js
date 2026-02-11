import { studentCollection } from "../models/student_model.js";
import { gradeCollection } from "../models/grade_model.js";
import { attendanceCollection } from "../models/attendance_model.js";

export const getProfile = async (req, res) => {
    const profile = await studentCollection
        .findOne({ userId: req.user.id })
        .populate("userId", "name email");

    res.json(profile);
};
export const viewMyGrades = async (req, res) => {
    const grades = await gradeCollection.find({ studentId: req.user.id });
    res.json(grades);
};

export const viewMyAttendance = async (req, res) => {
    const data = await attendanceCollection.find({ studentId: req.user.id });
    res.json(data);
};

