import { addBook, updateBook, readBook, deleteBook } from "../controllers/bookControllers.js";
import express from "express";

const router = express.Router();

router.get("/", readBook);
router.post("/", addBook);
router.put("/", updateBook);
router.delete("/", deleteBook);

export default router;