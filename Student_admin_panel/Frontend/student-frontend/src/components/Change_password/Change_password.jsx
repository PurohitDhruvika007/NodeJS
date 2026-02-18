import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Change_password.css"; // unified CSS
import { Base_auth_url } from "../../utils/global_variable";

export default function Change_password({ NavbarComponent }) {
    const [formData, setFormData] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    const [message, setMessage] = useState("");
    const [type, setType] = useState(""); // success or error
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Auto-hide alert
    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => setMessage(""), 4000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");

        if (formData.newPassword !== formData.confirmPassword) {
            setType("error");
            return setMessage("New passwords do not match");
        }

        if (formData.newPassword.length < 6) {
            setType("error");
            return setMessage("Password must be at least 6 characters");
        }

        try {
            setLoading(true);

            const res = await axios.put(
                `${Base_auth_url}change-password`, // your backend endpoint
                {
                    oldPassword: formData.oldPassword,
                    newPassword: formData.newPassword
                },
                { withCredentials: true }
            );

            setType("success");
            setMessage(res.data.message);

            setFormData({
                oldPassword: "",
                newPassword: "",
                confirmPassword: ""
            });

        } catch (err) {
            setType("error");
            setMessage(err.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {NavbarComponent && <NavbarComponent />}

            {message && (
                <div className={`top-alert ${type}`}>
                    <span>{message}</span>
                    <button className="close-btn" onClick={() => setMessage("")}>
                        ✖
                    </button>
                    <div className="progress-bar"></div>
                </div>
            )}

            <div className="change-password-container">
                <div className="change-password-card">
                    <h2>Change Password</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Current Password</label>
                            <input
                                type="password"
                                name="oldPassword"
                                value={formData.oldPassword}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>New Password</label>
                            <input
                                type="password"
                                name="newPassword"
                                value={formData.newPassword}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Confirm New Password</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button type="submit" disabled={loading}>
                            {loading ? "Updating..." : "Update Password"}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}
