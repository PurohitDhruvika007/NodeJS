import express from "express";
import {
    addBlog,
    updateBlog,
    getBlog,
    getBlogById,
    deleteBlog
} from "../controllers/BlogControllers.js";

import { authMiddleware } from "../middleware/AuthMiddleware.js";
import { upload } from "../middleware/UploadMiddleware.js";

const router = express.Router();

// create blog (protected)
router.post(
    "/",
    authMiddleware,
    upload.single("image"),
    addBlog
);

// get all blogs (public)
router.get("/", getBlog);

// get single blog (public)
router.get("/:id", getBlogById);

// update blog (protected)
router.put(
    "/:id",
    authMiddleware,
    upload.single("image"),
    updateBlog
);

// delete blog (protected)
router.delete(
    "/:id",
    authMiddleware,
    deleteBlog
);

export default router;
