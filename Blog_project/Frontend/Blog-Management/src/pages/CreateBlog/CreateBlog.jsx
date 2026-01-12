import { useState } from "react";
import api from "../../utils/api.js";
import { useNavigate } from "react-router-dom";
import "./CreateBlog.css";

const CreateBlog = () => {
    const [data, setData] = useState({
        title: "",
        content: "",
        image: null,
    });

    const [preview, setPreview] = useState(null);
    const navigate = useNavigate();

    const submit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("content", data.content);
        if (data.image) formData.append("image", data.image);

        await api.post("/blogs", formData);
        navigate("/");
    };

    const handleImage = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setData({ ...data, image: file });
        setPreview(URL.createObjectURL(file)); // 👈 LIVE PREVIEW
    };

    return (
        <div className="create-blog-wrapper">
            <div className="create-blog-card">
                <h1>Create Blog</h1>
                <p>Share your thoughts with the world ✨</p>

                <form onSubmit={submit}>
                    <label>Title</label>
                    <input
                        type="text"
                        value={data.title}
                        onChange={(e) =>
                            setData({ ...data, title: e.target.value })
                        }
                        required
                    />

                    <label>Content</label>
                    <textarea
                        rows="8"
                        value={data.content}
                        onChange={(e) =>
                            setData({ ...data, content: e.target.value })
                        }
                        required
                    />

                    {/* ✅ IMAGE PREVIEW */}
                    {preview && (
                        <div className="image-preview">
                            <p>Image Preview</p>
                            <img src={preview} alt="Preview" />
                        </div>
                    )}

                    <label>Upload Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImage}
                    />

                    <button>Create Blog </button>
                </form>
            </div>
        </div>
    );
};

export default CreateBlog;
