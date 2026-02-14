import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Forget_password.css";
import { Base_auth_url } from "../../utils/global_variable";

export default function ForgetPassword() {

    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [type, setType] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            await axios.post(`${Base_auth_url}forgot-password`, { email });

            // store email for reset password page
            localStorage.setItem("resetEmail", email);

            setType("success");
            setMessage("OTP sent successfully to your email!");

            setTimeout(() => {
                window.location.href = "/reset-password";
            }, 2000);

        } catch (err) {
            setType("error");
            setMessage(err.response?.data?.message || "Failed to send OTP!");
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
        <div className="forget-main">

            {message && (
                <div className={`top-alert ${type}`}>
                    <span>{message}</span>
                    <button className="close-btn" onClick={() => setMessage("")}>
                        ✖
                    </button>
                    <div className="progress-bar"></div>
                </div>
            )}

            <div className="forget-wrapper">
                <div className="forget-card">
                    <h2 className="title">Forgot Password?</h2>
                    <p className="subtitle">
                        Enter your email to receive an OTP
                    </p>

                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label>Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your registered email"
                                required
                            />
                        </div>

                        <button type="submit" className="btn-forget" disabled={loading}>
                            {loading ? "Sending..." : "Send OTP"}
                        </button>
                    </form>

                    <div className="back-login">
                        <a href="/signin">Back to Login</a>
                    </div>
                </div>
            </div>
        </div>
    );
}
