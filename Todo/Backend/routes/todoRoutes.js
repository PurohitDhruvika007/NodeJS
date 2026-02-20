import express from "express";
import { isVerified } from "../middleware/authMiddleware.js";
import { addTodo, readTodo, updateTodo, deleteTodo } from "../controllers/todoControllers.js";

const router = express.Router();

router.get("/", isVerified, readTodo);
router.post("/", isVerified, addTodo);
router.put("/:id", isVerified, updateTodo);
router.delete("/:id", isVerified, deleteTodo);

export default router;