import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import Admin_navbar from "../../components/Admin_navbar/Admin_navbar";
import { Base_admin_url } from "../../utils/global_variable";
import "./Add_students.css";

export default function Add_students() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "", email: "", password: "", course: "", roll_no: "", contact: "", address: "", photo: null
    });
    const [photoPreview, setPhotoPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = e => {
        const { name, value, files } = e.target;

        if (name === "photo" && files[0]) {
            setFormData({ ...formData, photo: files[0] });
            setPhotoPreview(URL.createObjectURL(files[0]));
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            const data = new FormData();
            Object.entries(formData).forEach(([key, val]) => val && data.append(key, val));
            await axios.post(`${Base_admin_url}students`, data, {
                withCredentials: true,
                headers: { "Content-Type": "multipart/form-data" }
            });
            alert("Student added successfully ✅");
            navigate("/admin-students");
        } catch (err) {
            setError(err.response?.data?.message || "Failed to add student");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Admin_navbar />
            <div className="add-student-container">
                <h2>Add Student</h2>
                {error && <div className="text-danger">{error}</div>}
                <form onSubmit={handleSubmit} className="add-student-form">
                    <div className="form-row">
                        <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
                        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
                    </div>

                    <div className="form-row">
                        <input type="text" name="course" placeholder="Course / Standard" value={formData.course} onChange={handleChange} />
                        <input type="text" name="roll_no" placeholder="Roll Number" value={formData.roll_no} onChange={handleChange} />
                        <input type="text" name="contact" placeholder="Contact Number" value={formData.contact} onChange={handleChange} />
                    </div>

                    <div className="form-row">
                        <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} />
                        <input type="file" name="photo" accept="image/*" onChange={handleChange} />
                        {photoPreview && (
                            <div className="photo-preview">
                                <img src={photoPreview} alt="Preview" />
                            </div>
                        )}
                    </div>

                    <button type="submit" disabled={loading}>{loading ? "Adding..." : "Add Student"}</button>
                </form>
            </div>
        </>
    );
}
