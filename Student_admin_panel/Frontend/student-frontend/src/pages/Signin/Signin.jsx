import React, { useState } from "react";
import axios from "axios";
import "./Signin.css";

export default function Signin() {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");
        try {
            const res = await axios.post("http://localhost:4000/api/login", formData);
            localStorage.setItem("token", res.data.token);
            setMessage("OTP sent to email");
            window.location.href = "/verify-otp";
        } catch (err) {
            setMessage(err.response?.data?.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="signin-wrapper">
            {/* LEFT FORM PANEL */}
            <div className="left-panel">
                <div className="login-card">
                    <h2 className="title">Welcome Back!</h2>
                    <p className="subtitle">Sign in to access your student dashboard</p>

                    {message && <div className="alert-message">{message}</div>}

                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                required
                            />
                        </div>

                        <div className="input-group">
                            <label>Password</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                                required
                            />
                        </div>

                        <div className="options">
                            <div>
                                <input type="checkbox" id="remember" />
                                <label htmlFor="remember">Remember me</label>
                            </div>
                            <a href="/forgot-password">Forgot password?</a>
                        </div>

                        <button type="submit" className="btn-login" disabled={loading}>
                            {loading ? "Signing in..." : "Sign In"}
                        </button>
                    </form>

                    <p className="signup-text">
                        Don't have an account? <a href="/register">Sign Up</a>
                    </p>
                </div>
            </div>

            {/* RIGHT IMAGE PANEL */}
            <div className="right-panel">
                <div className="overlay-text">
                    <h1>Student Management System</h1>
                    <p>Organize • Track • Excel</p>
                </div>
            </div>
        </div>
    );
}
