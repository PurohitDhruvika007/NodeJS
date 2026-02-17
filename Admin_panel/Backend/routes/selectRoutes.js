import { addDepartment, readDepartment, updateDepartment, deleteDepartment } from "../controllers/selectControllers.js";
import express from "express";

const router = express.Router();

router.get("/", readDepartment);
router.post("/", addDepartment);
router.put("/", updateDepartment);
router.delete("/", deleteDepartment);

export default router;