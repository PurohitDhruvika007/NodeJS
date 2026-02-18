import React, { useEffect, useState } from "react";
import axios from "axios";
import Student_navbar from "../../components/Student_navbar/Student_navbar";
import { Base_student_url } from "../../utils/global_variable";
import "./Student_profile.css";

export default function Student_profile() {
    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [editMode, setEditMode] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        course: "",
        roll_no: "",
        contact: "",
        address: "",
        photo: null,
    });

    // 🔹 Fetch Student Profile
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await axios.get(`${Base_student_url}profile`, { withCredentials: true });
                const data = res.data;

                // Flatten data: name & email are inside userId
                const profileData = {
                    name: data.userId?.name || "",
                    email: data.userId?.email || "",
                    course: data.course || "",
                    roll_no: data.roll_no || "",
                    contact: data.contact || "",
                    address: data.address || "",
                    photo: data.photo || null,
                };

                setStudent(profileData);
                setFormData(profileData);
            } catch (err) {
                setError(err.response?.data?.message || "Failed to load profile");
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    // 🔹 Handle input changes
    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (files) setFormData({ ...formData, [name]: files[0] });
        else setFormData({ ...formData, [name]: value });
    };

    // 🔹 Update Profile (if needed, optional)
    const handleUpdate = async () => {
        try {
            const data = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                if (value !== null) data.append(key, value);
            });

            const res = await axios.put(`${Base_student_url}profile`, data, {
                withCredentials: true,
                headers: { "Content-Type": "multipart/form-data" },
            });

            setStudent(res.data);
            setFormData(res.data);
            setEditMode(false);
            alert("Profile updated successfully ✅");
        } catch (err) {
            alert(err.response?.data?.message || "Update failed");
        }
    };

    if (loading) return <div className="loading">Loading profile...</div>;
    if (error) return <div className="error-msg">{error}</div>;
    if (!student) return <div className="error-msg">No profile data found</div>;

    return (
        <>
            <Student_navbar />

            <div className="student-profile-container">
                <div className="student-profile-card">
                    <h2>Student Profile</h2>

                    <div className="profile-photo">
                        {formData.photo && formData.photo instanceof File ? (
                            <img src={URL.createObjectURL(formData.photo)} alt="Student" />
                        ) : student.photo ? (
                            <img src={`http://localhost:4000/uploads/${student.photo}`} alt="Student" />
                        ) : (
                            <div className="no-photo">No Photo</div>
                        )}
                    </div>

                    <div className="profile-details">
                        <div className="detail">
                            <span className="label">Name:</span>
                            <span className="value">{student.name}</span>
                        </div>
                        <div className="detail">
                            <span className="label">Email:</span>
                            <span className="value">{student.email}</span>
                        </div>
                        <div className="detail">
                            <span className="label">Course:</span>
                            <span className="value">{student.course}</span>
                        </div>
                        <div className="detail">
                            <span className="label">Roll No:</span>
                            <span className="value">{student.roll_no}</span>
                        </div>
                        <div className="detail">
                            <span className="label">Contact:</span>
                            <span className="value">{student.contact}</span>
                        </div>
                        <div className="detail">
                            <span className="label">Address:</span>
                            <span className="value">{student.address}</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
