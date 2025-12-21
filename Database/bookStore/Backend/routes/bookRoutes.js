import { addBook, updateBook, readBook, deleteBook } from "../controllers/bookControllers.js";
import express from "express";

const router = express.Router();

router.get("/", readBook);
router.post("/", addBook);
router.put("/:id", updateBook);
router.delete("/:id", deleteBook);

export default router;