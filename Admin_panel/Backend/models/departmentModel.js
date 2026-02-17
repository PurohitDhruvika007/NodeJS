import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema({
    name: String,
}, { timestamps: true });

export const DepartmentCollection = mongoose.model("department", departmentSchema);