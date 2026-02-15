import React, { useEffect, useState } from "react";
import axios from "axios";
import Admin_navbar from "../../components/Admin_navbar/Admin_navbar";
import { Base_admin_url } from "../../utils/global_variable";
import "./Admin_profile.css";

export default function Admin_profile() {
    const [admin, setAdmin] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem("token");

                const res = await axios.get(`${Base_admin_url}profile`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    withCredentials: true,
                });

                // ✅ handle both response types
                setAdmin(res.data?.admin || res.data || null);

            } catch (err) {
                setError(err.response?.data?.message || "Failed to load profile");
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error-msg">{error}</div>;
    if (!admin) return <div className="error-msg">No profile data found</div>;

    return (
        <>
            <Admin_navbar />

            <div className="admin-profile-container">
                <div className="admin-profile-card">
                    <h2>Admin Profile</h2>

                    <div className="profile-photo">
                        {admin.photo ? (
                            <img
                                src={`http://localhost:4000/uploads/${admin.photo}`}
                                alt="Admin"
                            />
                        ) : (
                            <div className="no-photo">No Photo</div>
                        )}
                    </div>

                    <div className="profile-details">
                        <div className="detail">
                            <span className="label">Name:</span>
                            <span className="value">
                                {admin.userId?.name || "-"}
                            </span>
                        </div>

                        <div className="detail">
                            <span className="label">Email:</span>
                            <span className="value">
                                {admin.userId?.email || "-"}
                            </span>
                        </div>

                        <div className="detail">
                            <span className="label">Role:</span>
                            <span className="value">
                                {admin.userId?.role || "-"}
                            </span>
                        </div>

                        <div className="detail">
                            <span className="label">Department:</span>
                            <span className="value">
                                {admin.department || "-"}
                            </span>
                        </div>

                        <div className="detail">
                            <span className="label">Phone:</span>
                            <span className="value">
                                {admin.phone || "-"}
                            </span>
                        </div>

                        <div className="detail">
                            <span className="label">Address:</span>
                            <span className="value">
                                {admin.address || "-"}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
