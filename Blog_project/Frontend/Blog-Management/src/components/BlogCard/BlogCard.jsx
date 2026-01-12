import { Link } from "react-router-dom";
import api from "../../utils/api";
import { isLoggedIn } from "../../utils/auth";
import "./BlogCard.css";

const BlogCard = ({ blog, onDelete }) => {
    const loggedIn = isLoggedIn();

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this blog?")) return;

        try {
            await api.delete(`/blogs/${blog._id}`);
            if (onDelete) onDelete(blog._id);
        } catch (err) {
            alert(err.response?.data?.message || "Delete failed");
        }
    };

    return (
        <div className="blog-card">
            {blog.image && (
                <img
                    src={`http://localhost:4000${blog.image}`}
                    alt="blog"
                    className="blog-image"
                />
            )}

            <div className="blog-content">
                <h3>{blog.title}</h3>
                <p className="blog-text">
                    {blog.content.substring(0, 100)}...
                </p>
                <span className="blog-author">
                    ✍ {blog.author?.name}
                </span>

                <div className="blog-actions">
                    <Link to={`/blog/${blog._id}`} className="btn view">
                        View
                    </Link>

                    {loggedIn && (
                        <>
                            <Link to={`/edit/${blog._id}`} className="btn edit">
                                Edit
                            </Link>
                            <button
                                onClick={handleDelete}
                                className="btn delete"
                            >
                                Delete
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BlogCard;
