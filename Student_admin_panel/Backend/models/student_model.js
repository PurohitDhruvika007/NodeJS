import mongoose from "mongoose"

const studentSchema = new mongoose.Schema({
    auth_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "auth"
    },
    course: String,
    roll_no: String,
    phone: String,
    address: String,
    photo: String
}, { timestamps: true });

export const studentCollection = mongoose.model("student", studentSchema);


