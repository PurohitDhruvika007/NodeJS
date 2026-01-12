import { useEffect, useState } from "react";
import api from "../../utils/api.js";
import BlogCard from "../../components/BlogCard/BlogCard.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import "./Home.css";

const Home = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get("/blogs")
            .then(res => {
                setBlogs(res.data.blogs);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    return (
        <div className="home-wrapper">
            {/* HERO SECTION */}
            <section className="home-hero">
                <h1>Blog Management System</h1>
                <p>Read • Write • Inspire the world ✨</p>
            </section>

            {/* BLOG SECTION */}
            <section className="blog-section">
                <h2>Latest Blogs</h2>

                {loading ? (
                    <p className="status-msg">Loading blogs...</p>
                ) : blogs.length === 0 ? (
                    <p className="status-msg">No blogs available</p>
                ) : (
                    <div className="blog-grid">
                        {blogs.map(blog => (
                            <BlogCard key={blog._id} blog={blog} />
                        ))}
                    </div>
                )}
            </section>

            <Footer />
        </div>
    );
};

export default Home;
