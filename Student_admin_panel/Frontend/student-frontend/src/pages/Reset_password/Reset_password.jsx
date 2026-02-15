import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./Reset_password.css";
import { Base_auth_url } from "../../utils/global_variable";

export default function ResetPassword() {
    const [otp, setOtp] = useState(new Array(6).fill(""));
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [type, setType] = useState("");
    const [timer, setTimer] = useState(30);
    const [resendDisabled, setResendDisabled] = useState(true);

    const inputsRef = useRef([]);
    const email = localStorage.getItem("resetEmail");

    const handleOtpChange = (value, index) => {
        if (!/^[0-9]?$/.test(value)) return;
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        if (value && index < 5) inputsRef.current[index + 1].focus();
    };

    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => setTimer(prev => prev - 1), 1000);
            return () => clearInterval(interval);
        } else {
            setResendDisabled(false);
        }
    }, [timer]);

    useEffect(() => {
        if (message) {
            const t = setTimeout(() => setMessage(""), 4000);
            return () => clearTimeout(t);
        }
    }, [message]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setType("error");
            setMessage("Passwords do not match!");
            return;
        }

        setLoading(true);
        try {
            await axios.post(
                `${Base_auth_url}reset-password`,
                { email, otp: otp.join(""), newPassword },
                { withCredentials: true } // ✅ use cookie
            );
            setType("success");
            setMessage("Password reset successfully!");
            localStorage.removeItem("resetEmail");
            setTimeout(() => (window.location.href = "/signin"), 2000);
        } catch (err) {
            setType("error");
            setMessage(err.response?.data?.message || "Reset failed!");
        } finally {
            setLoading(false);
        }
    };

    const handleResend = async () => {
        try {
            await axios.post(`${Base_auth_url}forgot-password`, { email }, { withCredentials: true });
            setType("success");
            setMessage("OTP resent successfully!");
            setTimer(30);
            setResendDisabled(true);
        } catch {
            setType("error");
            setMessage("Failed to resend OTP");
        }
    };

    return (
        <div className="reset-main">
            {message && (
                <div className={`top-alert ${type}`}>
                    <span>{message}</span>
                    <button className="close-btn" onClick={() => setMessage("")}>✖</button>
                    <div className="progress-bar"></div>
                </div>
            )}

            <div className="reset-wrapper">
                <div className="reset-card">
                    <h2 className="title">Reset Password</h2>
                    <p className="subtitle">Enter OTP & new password</p>

                    <form onSubmit={handleSubmit}>
                        <div className="otp-container">
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    maxLength="1"
                                    value={digit}
                                    ref={(el) => (inputsRef.current[index] = el)}
                                    onChange={(e) => handleOtpChange(e.target.value, index)}
                                />
                            ))}
                        </div>

                        <div className="input-group">
                            <label>New Password</label>
                            <div className="password-wrapper">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    placeholder="Enter new password"
                                    required
                                />
                                <span onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? "🙈" : "👁"}
                                </span>
                            </div>
                        </div>

                        <div className="input-group">
                            <label>Confirm Password</label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirm new password"
                                required
                            />
                        </div>

                        <button type="submit" className="btn-reset" disabled={loading}>
                            {loading ? "Resetting..." : "Reset Password"}
                        </button>
                    </form>

                    <div className="resend">
                        {resendDisabled ? <span>Resend OTP in {timer}s</span> : <button onClick={handleResend}>Resend OTP</button>}
                    </div>
                </div>
            </div>
        </div>
    );
}
