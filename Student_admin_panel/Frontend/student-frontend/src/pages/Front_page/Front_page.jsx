import React, { useRef } from "react";
import "./Front_page.css";
import { useNavigate } from "react-router";

export default function Front_page() {
    const navigate = useNavigate();
    const aboutRef = useRef(null);

    const scrollToAbout = () => {
        aboutRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const schoolName = "Sunshine International School";

    return (
        <div className="frontpage-main">

            {/* 🔥 STICKY GLASS NAVBAR */}
            <header className="navbar">
                <div className="logo">
                    🎓 <span>{schoolName}</span>
                </div>

                <div>
                    <button
                        onClick={() => navigate("/signin", { replace: true })}
                        className="btn-login-nav"
                    >
                        Login
                    </button>
                </div>
            </header>

            {/* 🔥 HERO SECTION */}
            <section className="hero">
                <div className="hero-overlay"></div>

                <div className="hero-content">
                    <h1>Empowering Future Leaders</h1>
                    <p>
                        A smart and modern platform to manage students,
                        attendance, grades, and academic excellence.
                    </p>

                    <div className="hero-buttons d-flex">
                        <button
                            onClick={() => navigate("/signin", { replace: true })}
                            className="btn-primary"
                        >
                            Login to Dashboard
                        </button>

                        <button
                            onClick={scrollToAbout}
                            className="btn-outline"
                        >
                            Learn More
                        </button>
                    </div>
                </div>
            </section>

            {/* 🔥 ABOUT SECTION */}
            <section className="about" ref={aboutRef}>
                <h2>Why Choose {schoolName}?</h2>

                <div className="features">
                    <div className="feature-card">
                        📊
                        <h3>Smart Analytics</h3>
                        <p>Real-time academic performance tracking.</p>
                    </div>

                    <div className="feature-card">
                        📝
                        <h3>Attendance Management</h3>
                        <p>Effortless student attendance system.</p>
                    </div>

                    <div className="feature-card">
                        🔔
                        <h3>Instant Notifications</h3>
                        <p>Stay updated with real-time alerts.</p>
                    </div>

                    <div className="feature-card">
                        🔐
                        <h3>Secure System</h3>
                        <p>Protected student data & safe access.</p>
                    </div>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="footer">
                © {new Date().getFullYear()} {schoolName}. All rights reserved.
            </footer>

        </div>
    );
}
