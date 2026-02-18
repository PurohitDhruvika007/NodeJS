import React, { useState } from "react";
import { useNavigate, Link } from "react-router";
import "./Admin_navbar.css";

export default function Admin_navbar() {

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/signin");
    };

    return (
        <nav className="admin-navbar">

            {/* LEFT SIDE */}
            <div className="navbar-left">
                <h2 className="logo">EduAdmin</h2>
            </div>

            {/* RIGHT SIDE */}
            <div className="navbar-right">

                <Link to="/admin-dashboard">Dashboard</Link>
                <Link to="/admin-students">Students</Link>
                <Link to="/admin-attendance">Attendance</Link>
                <Link to="/admin-grades">Grades</Link>

                {/* PROFILE DROPDOWN */}
                <div className="profile-section">
                    <div
                        className="profile-btn"
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                    >
                        Admin ▾
                    </div>

                    {dropdownOpen && (
                        <div className="dropdown-menu">
                            <Link to="/admin-profile">Profile</Link>
                            <Link to="/change-admin-password">Change Password</Link>
                            <div onClick={handleLogout} className="logout-btn">
                                Logout
                            </div>
                        </div>
                    )}
                </div>

            </div>
        </nav>
    );
}
