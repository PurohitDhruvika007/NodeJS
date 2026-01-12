import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../utils/api.js";
import "./BlogDetail.css";

const BlogDetail = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const res = await api.get(`/blogs/${id}`);
                setBlog(res.data.blog);
            } catch (err) {
                console.error("Failed to fetch blog", err);
            } finally {
                setLoading(false);
            }
        };

        fetchBlog();
    }, [id]);

    if (loading) return <p className="blog-loading">Loading blog...</p>;
    if (!blog) return <p className="blog-not-found">Blog not found</p>;

    return (
        <div className="blog-detail-container">
            <h1 className="blog-detail-title">{blog.title}</h1>

            {blog.image && (
                <img
                    src={`http://localhost:4000${blog.image}`}
                    alt="blog"
                    className="blog-detail-image"
                />
            )}

            <p className="blog-detail-content">{blog.content}</p>

            <hr className="blog-detail-divider" />

            <div className="blog-author-box">
                <p>
                    <strong>Author:</strong> {blog.author?.name}
                </p>
                <p>
                    <strong>Email:</strong> {blog.author?.email}
                </p>
            </div>
        </div>
    );
};

export default BlogDetail;
