import React, { useEffect, useState } from "react";
import axios from "axios";
import Admin_navbar from "../../components/Admin_navbar/Admin_navbar";
import { Base_admin_url } from "../../utils/global_variable";
import "./Admin_profile.css";

export default function Admin_profile() {
    const [admin, setAdmin] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [editMode, setEditMode] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        department: "",
        designation: "",
        phone: "",
        emergencyContact: "",
        gender: "",
        dob: "",
        address: "",
        bio: "",
        status: "active",
        photo: null
    });

    // 🔹 Fetch Admin Profile
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`${Base_admin_url}profile`, {
                    withCredentials: true,
                });

                const data = res.data;

                // Convert DOB to yyyy-mm-dd for input field
                if (data.dob) data.dob = data.dob.split("T")[0];

                setAdmin(data);
                setFormData(data);
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

    // 🔹 Update Profile
    const handleUpdate = async () => {
        try {
            const data = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                if (value !== null) data.append(key, value);
            });

            const res = await axios.put(`${Base_admin_url}profile`, data, {
                withCredentials: true,
                headers: { "Content-Type": "multipart/form-data" },
            });

            const updated = res.data;
            if (updated.dob) updated.dob = updated.dob.split("T")[0];

            setAdmin(updated);
            setFormData(updated);
            setEditMode(false);
            alert("Profile updated successfully ✅");
        } catch (err) {
            alert(err.response?.data?.message || "Update failed");
        }
    };

    if (loading) return <div className="loading">Loading profile...</div>;
    if (error) return <div className="error-msg">{error}</div>;
    if (!admin) return <div className="error-msg">No profile data found</div>;

    const fields = [
        { label: "Name", name: "name", type: "text" },
        { label: "Email", name: "email", type: "email" },
        { label: "Department", name: "department" },
        { label: "Designation", name: "designation" },
        { label: "Phone", name: "phone" },
        { label: "Emergency Contact", name: "emergencyContact" },
        { label: "Gender", name: "gender" },
        { label: "DOB", name: "dob", type: "date" },
        { label: "Address", name: "address" },
        { label: "Bio", name: "bio" },
        { label: "Status", name: "status" }
    ];

    return (
        <>
            <Admin_navbar />
            <div className="admin-profile-container">
                <div className="admin-profile-card">
                    <h2>Admin Profile</h2>

                    <div className="profile-photo">
                        {formData.photo && formData.photo instanceof File ? (
                            <img src={URL.createObjectURL(formData.photo)} alt="Admin" />
                        ) : admin.photo ? (
                            <img
                                src={`http://localhost:4000/uploads/${admin.photo}`}
                                alt="Admin"
                            />
                        ) : (
                            <div className="no-photo">No Photo</div>
                        )}
                    </div>

                    <div className="profile-details">
                        {fields.map((field) => {
                            const value = editMode ? formData[field.name] : admin[field.name];

                            // ❌ Skip empty fields only when not in edit mode
                            if (!editMode && (!value || value === "")) return null;

                            return (
                                <div className="detail" key={field.name}>
                                    <span className="label">{field.label}:</span>
                                    {editMode ? (
                                        field.name === "status" ? (
                                            <select name="status" value={formData.status} onChange={handleChange}>
                                                <option value="active">Active</option>
                                                <option value="inactive">Inactive</option>
                                            </select>
                                        ) : (
                                            <input
                                                type={field.type || "text"}
                                                name={field.name}
                                                value={formData[field.name] || ""}
                                                onChange={handleChange}
                                            />
                                        )
                                    ) : (
                                        <span className="value">{value}</span>
                                    )}
                                </div>
                            );
                        })}

                        {editMode && (
                            <div className="detail">
                                <span className="label">Photo:</span>
                                <input type="file" name="photo" accept="image/*" onChange={handleChange} />
                            </div>
                        )}
                    </div>

                    <div className="profile-buttons">
                        {editMode ? (
                            <>
                                <button className="save-btn" onClick={handleUpdate}>Save</button>
                                <button className="cancel-btn" onClick={() => setEditMode(false)}>Cancel</button>
                            </>
                        ) : (
                            <button className="edit-btn" onClick={() => setEditMode(true)}>Edit Profile</button>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
