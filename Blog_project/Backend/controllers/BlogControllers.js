import { Blog } from "../models/BlogModels.js";

export const addBlog = async (req, res) => {
    try {
        const { title, content } = req.body;
        const blog = await Blog.create({
            title,
            content,
            image: req.file ? `/uploads/${req.file.filename}` : null,
            author: req.user.id
        });
        res.json({ message: "blog added successfully !!", blog });
    }
    catch (err) {
        res.json({ message: "blog is not added ", err });
    }
}

export const getBlog = async (req, res) => {
    try {
        const blogs = await Blog.find().populate("author", "name email")
        res.json({ message: "blog fetched!", blogs })
    }
    catch (err) {
        res.json({ message: "blog not able to fetched !!", err });
    }
}
export const getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id).populate("author", "name");
        res.json({ message: "blog fetched by id ", blog })
    }
    catch (err) {
        res.json({ message: "blog not fetched bu id", err })
    }
}
export const updateBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        // check ownership
        if (blog.author.toString() !== req.user.id) {
            return res.status(403).json({ message: "Not authorized" });
        }

        blog.title = req.body.title || blog.title;
        blog.content = req.body.content || blog.content;
        if (req.file) {
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

        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        // check ownership
        if (blog.author.toString() !== req.user.id) {
            return res.status(403).json({ message: "Not authorized" });
        }

        await blog.deleteOne();

        res.json({ message: "Blog deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};