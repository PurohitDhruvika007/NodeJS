import mongoose from "mongoose"

const studentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "auth"
    },
    course: String,
    roll_no: String,
    contact: String,
    address: String,
    photo: String
}, { timestamps: true });

export const studentCollection = mongoose.model("student", studentSchema);


