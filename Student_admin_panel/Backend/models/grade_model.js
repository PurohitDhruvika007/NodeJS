import mongoose from "mongoose";

const gradeSchema = new mongoose.Schema({
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: "student", required: true },
    subject: String,
    marks: Number,
    term: String
}, { timestamps: true });

export const gradeCollection = mongoose.model("grade", gradeSchema);
