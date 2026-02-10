import { getAllUsers, getCurrentUser, updateUser, deleteUser } from "../controllers/adminController.js";
import express from "express"

const router = express.Router();

router.get("/getAllUsers", getAllUsers);
router.get("/getUser", getCurrentUser);
router.put("/updateUser", updateUser);
router.delete("/deleteUser", deleteUser);

export default router;