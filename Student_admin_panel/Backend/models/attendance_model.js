import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "student",
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ["present", "absent"],
        required: true
    }
}, { timestamps: true });

export const attendanceCollection = mongoose.model("attendance", attendanceSchema);
