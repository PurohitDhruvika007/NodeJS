import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../utils/api.js";
import "./EditBlog.css";

const EditBlog = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState(null);
    const [currentImage, setCurrentImage] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const res = await api.get(`/blogs/${id}`);
                setTitle(res.data.blog.title);
                setContent(res.data.blog.content);
                setCurrentImage(res.data.blog.image); // 👈 existing image
                setLoading(false);
            } catch (err) {
                alert("Failed to load blog");
                navigate("/");
            }
        };
        fetchBlog();
    }, [id, navigate]);

    const submit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
        if (image) formData.append("image", image);

        try {
            await api.put(`/blogs/${id}`, formData);
            alert("Blog updated successfully ✨");
            navigate("/");
        } catch (err) {
            alert("Blog update failed");
        }
    };

    if (loading) return <p className="edit-loading">Loading blog...</p>;

    return (
        <div className="edit-blog-wrapper">
            <div className="edit-blog-card">
                <h1>Edit Blog</h1>
                <p>Update your blog content ✍️</p>

                <form onSubmit={submit}>
                    <label>Blog Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />

                    <label>Blog Content</label>
                    <textarea
                        rows="8"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />

                    {/* ✅ EXISTING IMAGE PREVIEW */}
                    {currentImage && (
                        <div className="current-image-box">
                            <p>Current Image</p>
                            <img
                                src={`http://localhost:4000${currentImage}`}
                                alt="Current Blog"
                            />
                        </div>
                    )}

                    <label>Replace Image (optional)</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files[0])}
                    />

                    <button type="submit">Update Blog</button>
                </form>
            </div>
        </div>
    );
};

export default EditBlog;
