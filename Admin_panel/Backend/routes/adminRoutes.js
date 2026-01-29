import { getAllUsers, getUser, updateUser, deleteUser } from "../controllers/adminController.js";
import express from "express"

const router = express.Router();

router.get("/getAllUsers", getAllUsers);
router.get("/getUser", getUser);
router.post("/updateUser", updateUser);
router.post("/deleteUser", deleteUser);

export default router;