import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import "./Signin.css";
import { Base_auth_url } from "../../utils/global_variable";

export default function Signin() {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            const res = await axios.post(`${Base_auth_url}login`, formData);

            // Navigate to OTP page with email as state
            navigate("/verify-otp", { state: { email: formData.email }, replace: true });
        } catch (err) {
            setMessage(err.response?.data?.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="signin-main">
            <div className="signin-wrapper">
                <div className="left-panel">
                    <div className="login-card">
                        <h2 className="title">Welcome Back!</h2>
                        <p className="subtitle">Sign in to access your dashboard</p>

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
                                    <label htmlFor="remember"> Remember me</label>
                                </div>
                                <a href="/forgot-password">Forgot Password?</a>
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
