import { DepartmentCollection } from "../models/departmentModel.js";

export const addDepartment = async (req, res) => {
    const { name } = req.query;
    try {
        await DepartmentCollection.create({ name });
        return res.json({ status: true, message: "data added successfully" });
    }
    catch (err) {
        return res.json({ status: false, message: "data not added" });
    }
}

export const readDepartment = async (req, res) => {
    try {
        const departments = await DepartmentCollection.find();
        return res.json({ status: true, message: "data fetched successfully", departments });
    }
    catch (err) {
        return res.json({ status: false, message: "data not fetched" });
    }
}

export const updateDepartment = async (req, res) => {
    try {
    }
    catch (err) {
        return res.json({ status: false, message: "departments updated successfully" });
    }
}

export const deleteDepartment = async (req, res) => {

}