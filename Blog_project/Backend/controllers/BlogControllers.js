import { Blog } from "../models/BlogModels.js";
import fs from "fs";
import path from "path";

/* ============ ADD BLOG ============ */
export const addBlog = async (req, res) => {
    try {
        const { title, content } = req.body;
        const blog = await Blog.create({
            title,
            content,
            image: req.file ? `/uploads/${req.file.filename}` : null,
            author: req.user.id, // logged-in user id
        });
        res.json({ message: "Blog added successfully !!", blog });
    } catch (err) {
        res.status(500).json({ message: "Blog is not added", err });
    }
};

/* ============ GET ALL BLOGS ============ */
export const getBlog = async (req, res) => {
    try {
        const blogs = await Blog.find().populate("author", "name email");
        res.json({ message: "Blogs fetched!", blogs });
    } catch (err) {
        res.status(500).json({ message: "Blogs not fetched", err });
    }
};

/* ============ GET BLOG BY ID ============ */
export const getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id).populate("author", "name email");
        if (!blog) return res.status(404).json({ message: "Blog not found" });
        res.json({ message: "Blog fetched by id", blog });
    } catch (err) {
        res.status(500).json({ message: "Blog not fetched by id", err });
    }
};

/* ============ UPDATE BLOG ============ */
export const updateBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({ message: "Blog not found" });

        // check ownership
        if (blog.author.toString() !== req.user.id)
            return res.status(403).json({ message: "Not authorized" });

        blog.title = req.body.title || blog.title;
        blog.content = req.body.content || blog.content;

        if (req.file) {
            // Delete old image from uploads folder if exists
            if (blog.image) {
                const oldImagePath = path.join("uploads", blog.image.replace("/uploads/", ""));
                if (fs.existsSync(oldImagePath)) fs.unlinkSync(oldImagePath);
            }
            blog.image = `/uploads/${req.file.filename}`;
        }

        await blog.save();
        res.json({ message: "Blog updated successfully", blog });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/* ============ DELETE BLOG ============ */
export const deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({ message: "Blog not found" });

        // check ownership
        if (blog.author.toString() !== req.user.id)
            return res.status(403).json({ message: "Not authorized" });

        // Delete image from uploads folder if exists
        if (blog.image) {
            const imagePath = path.join("uploads", blog.image.replace("/uploads/", ""));
            if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
        }

        await blog.deleteOne();
        res.json({ message: "Blog deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
