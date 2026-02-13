import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Signin.css";
import { Base_auth_url } from "../../utils/global_variable";

export default function Signin() {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [type, setType] = useState(""); // success or error

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            const res = await axios.post(`${Base_auth_url}login`, formData);
            localStorage.setItem("token", res.data.token);

            setType("success");
            setMessage("OTP sent successfully to your email!");
            setTimeout(() => {
                window.location.href = "/verify-otp";
            }, 2000);
        } catch (err) {
            setType("error");
            setMessage(err.response?.data?.message || "Login failed!");
        } finally {
            setLoading(false);
        }
    };

    // Auto hide alert
    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                setMessage("");
            }, 4000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    return (
        <div className="signin-main">

            {/* 🔥 TOP ALERT */}
            {message && (
                <div className={`top-alert ${type}`}>
                    <span>{message}</span>
                    <button className="close-btn" onClick={() => setMessage("")}>
                        ✖
                    </button>
                    <div className="progress-bar"></div>
                </div>
            )}

            <div className="signin-wrapper">
                <div className="left-panel">
                    <div className="login-card">
                        <h2 className="title">Welcome Back!</h2>
                        <p className="subtitle">Sign in to access your student dashboard</p>

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
                                    <label htmlFor="remember"> Remember me</label>
                                </div>
                                <a href="/forgot-password">Forgot password?</a>
                            </div>

                            <button type="submit" className="btn-login" disabled={loading}>
                                {loading ? "Signing in..." : "Sign In"}
                            </button>
                        </form>
                    </div>
                </div>

                <div className="right-panel"></div>
            </div>
        </div>
    );
}
