import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import "./Signin.css";
import { Base_auth_url } from "../../utils/global_variable";

export default function Signin() {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [type, setType] = useState(""); // "success" or "error"
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");
        setType("");

        try {
            const res = await axios.post(
                `${Base_auth_url}login`,
                formData,
                { withCredentials: true }
            );

            console.log("Login Response:", res.data);

            // ✅ OTP sent to email for ANY role
            if (res.data.message === "OTP sent to email") {
                setType("success");
                setMessage("OTP sent to your email!");

                setTimeout(() => {
                    navigate("/verify-otp", {
                        state: { email: formData.email },
                        replace: true
                    });
                }, 1000);
                return;
            }

            // Unexpected response
            setType("error");
            setMessage("Unexpected server response");

        } catch (err) {
            console.error("Login Error:", err.response?.data);
            setType("error");
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

                        {message && (
                            <div className={`alert-message ${type}`}>
                                {message}
                            </div>
                        )}

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
                                <input type="checkbox" id="remember" />
                                <label htmlFor="remember"> Remember me</label>
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
