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

            {/* NAVBAR */}
            <header className="navbar">
                <div className="logo">
                    🎓 {schoolName}
                </div>

                <button
                    onClick={() => navigate("/signin", { replace: true })}
                    className="btn-login-nav"
                >
                    Login
                </button>
            </header>

            {/* HERO SECTION */}
            <section className="hero">
                <div className="hero-left">
                    <h1>Empowering Education with Technology</h1>
                    <p>
                        Manage students, track performance, and monitor attendance
                        with our secure and intelligent academic system.
                    </p>

                    <div className="hero-buttons">
                        <button
                            onClick={() => navigate("/signin", { replace: true })}
                            className="btn-primary"
                        >
                            Go to Dashboard
                        </button>

                        <button
                            onClick={scrollToAbout}
                            className="btn-secondary"
                        >
                            Learn More
                        </button>
                    </div>
                </div>

                <div className="hero-right">
                    <img
                        src="https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=900&q=80"
                        alt="School"
                    />
                </div>
            </section>

            {/* STATS */}
            <section className="stats">
                <div className="stat">
                    <h2>1200+</h2>
                    <p>Students</p>
                </div>
                <div className="stat">
                    <h2>85+</h2>
                    <p>Teachers</p>
                </div>
                <div className="stat">
                    <h2>98%</h2>
                    <p>Success Rate</p>
                </div>
                <div className="stat">
                    <h2>15+</h2>
                    <p>Years Experience</p>
                </div>
            </section>

            {/* ABOUT / FEATURES */}
            <section className="about" ref={aboutRef}>
                <h2>Why Choose {schoolName}?</h2>

                <div className="features">
                    <div className="feature">
                        <h3>📊 Smart Analytics</h3>
                        <p>Real-time insights into academic performance.</p>
                    </div>

                    <div className="feature">
                        <h3>📝 Attendance Tracking</h3>
                        <p>Automated attendance system with reports.</p>
                    </div>

                    <div className="feature">
                        <h3>🔐 Secure Platform</h3>
                        <p>Advanced protection for all student data.</p>
                    </div>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="footer">
                © {new Date().getFullYear()} {schoolName}. All Rights Reserved.
            </footer>

        </div>
    );
}
