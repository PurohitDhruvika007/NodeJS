import express from "express";
import { uploads } from "../middleware/upload.js";
import {
    addMovie,
    updateMovie,
    deleteMovie,
    getMovie
} from "../controller/movie_controller.js";

const router = express.Router();

router.post("/api", uploads.single("poster"), addMovie);
router.get("/api", getMovie);
router.delete("/api/:id", deleteMovie);
router.put("/api/:id", uploads.single("poster"), updateMovie);

export default router;
