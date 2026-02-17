import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import axios from "axios";
import Admin_navbar from "../../components/Admin_navbar/Admin_navbar";
import { Base_admin_url } from "../../utils/global_variable";
import "./Edit_students.css";

export default function Edit_students() {
    const location = useLocation();
    const navigate = useNavigate();
    const studentId = location.state?.id;

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        course: "",
        roll_no: "",
        contact: "",
        address: "",
        photo: null,
        oldPhoto: null,
    });

    const [photoPreview, setPhotoPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Fetch student data
    useEffect(() => {
        if (!studentId) {
            navigate("/admin-students");
            return;
        }

        const fetchStudent = async () => {
            try {
                const res = await axios.get(`${Base_admin_url}students`, { withCredentials: true });
                const student = res.data.find(s => s._id === studentId);
                if (!student) {
                    setError("Student not found");
                    return;
                }

                setFormData({
                    name: student.userId.name,
                    email: student.userId.email,
                    course: student.course || "",
                    roll_no: student.roll_no || "",
                    contact: student.contact || "",
                    address: student.address || "",
                    photo: null,
                    oldPhoto: student.photo || null,
                });
            } catch (err) {
                setError("Failed to load student data");
            }
        };

        fetchStudent();
    }, [studentId, navigate]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === "photo" && files[0]) {
            setFormData({ ...formData, photo: files[0] });
            setPhotoPreview(URL.createObjectURL(files[0]));
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const data = new FormData();
            Object.entries(formData).forEach(([key, val]) => val && key !== "oldPhoto" && data.append(key, val));

            await axios.put(
                `${Base_admin_url}update-student/${studentId}`,
                data,
                { withCredentials: true, headers: { "Content-Type": "multipart/form-data" } }
            );

            alert("Student updated successfully ✅");
            navigate("/admin-students");
        } catch (err) {
            setError(err.response?.data?.message || "Update failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Admin_navbar />
            <div className="add-student-container">
                <h2>Edit Student</h2>
                {error && <div className="text-danger">{error}</div>}

                <form onSubmit={handleSubmit} className="add-student-form">
                    <div className="form-row">
                        <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
                        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                        <input type="text" name="course" placeholder="Course / Standard" value={formData.course} onChange={handleChange} />
                    </div>

                    <div className="form-row">
                        <input type="text" name="roll_no" placeholder="Roll Number" value={formData.roll_no} onChange={handleChange} />
                        <input type="text" name="contact" placeholder="Contact Number" value={formData.contact} onChange={handleChange} />
                        <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} />
                    </div>

                    <div className="form-row">
                        <input type="file" name="photo" accept="image/*" onChange={handleChange} />
                        {(photoPreview || formData.oldPhoto) && (
                            <div className="photo-preview">
                                <img
                                    src={photoPreview || `http://localhost:4000/uploads/${formData.oldPhoto}`}
                                    alt="Preview"
                                />
                            </div>
                        )}
                    </div>

                    <button type="submit" disabled={loading}>{loading ? "Updating..." : "Update Student"}</button>
                </form>
            </div>
        </>
    );
}
