import React, { useState } from "react";
import { useNavigate, Link } from "react-router";
import "./Student_navbar.css"; // SAME CSS as admin navbar

export default function Student_navbar() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        navigate("/signin");
    };

    return (
        <nav className="admin-navbar"> {/* SAME CLASS as admin */}

            {/* LEFT SIDE */}
            <div className="navbar-left">
                <h2 className="logo">EduPortal</h2>
            </div>

            {/* RIGHT SIDE */}
            <div className="navbar-right">
                <Link to="/student-dashboard">Dashboard</Link>
                <Link to="/student-grades">Grades</Link>
                <Link to="/student-attendance">Attendance</Link>

                {/* PROFILE DROPDOWN */}
                <div className="profile-section">
                    <div
                        className="profile-btn"
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                    >
                        Student ▾
                    </div>

                    {dropdownOpen && (
                        <div className="dropdown-menu">
                            <Link to="/student-profile">Profile</Link>
                            <Link to="/change-student-password">Change Password</Link>
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
