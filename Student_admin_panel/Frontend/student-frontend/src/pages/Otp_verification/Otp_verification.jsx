import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router";
import axios from "axios";
import "./Otp_verification.css";
import { Base_auth_url } from "../../utils/global_variable";

export default function OtpVerification() {
    const location = useLocation();
    const navigate = useNavigate();
    const email = location.state?.email;

    const [otp, setOtp] = useState(new Array(6).fill(""));
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [type, setType] = useState("");
    const inputRefs = useRef([]);

    useEffect(() => {
        if (!email) {
            setType("error");
            setMessage("Email not provided. Redirecting to login...");
            setTimeout(() => navigate("/signin", { replace: true }), 2000);
        }
    }, [email, navigate]);

    const handleChange = (element, index) => {
        if (/[^0-9]/.test(element.value)) return;
        const newOtp = [...otp];
        newOtp[index] = element.value;
        setOtp(newOtp);
        if (element.value && index < 5) inputRefs.current[index + 1].focus();
    };

    const handleBackspace = (e, index) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) return;

        setLoading(true);
        setMessage("");

        try {
            const otpValue = otp.join("");
            const res = await axios.post(
                `${Base_auth_url}verify-otp`,
                { email, otp: otpValue },
                { withCredentials: true } // ✅ important
            );

            setType("success");
            setMessage("OTP verified successfully!");

            // Redirect based on role
            setTimeout(() => {
                if (res.data.role === "admin") navigate("/admin-dashboard", { replace: true });
                else navigate("/student-dashboard", { replace: true });
            }, 1500);
        } catch (err) {
            setType("error");
            setMessage(err.response?.data?.message || "OTP verification failed!");
        } finally {
            setLoading(false);
        }
    };

    const handleResend = async () => {
        try {
            await axios.post(`${Base_auth_url}resend-otp`, { email }, { withCredentials: true });
            setType("success");
            setMessage("OTP resent successfully!");
        } catch (err) {
            setType("error");
            setMessage("Failed to resend OTP");
        }
    };

    return (
        <div className="otp-main">
            {message && (
                <div className={`top-alert ${type}`}>
                    <span>{message}</span>
                    <button className="close-btn" onClick={() => setMessage("")}>✖</button>
                    <div className="progress-bar"></div>
                </div>
            )}

            <div className="otp-wrapper">
                <div className="otp-card">
                    <h2 className="title">OTP Verification</h2>
                    <p className="subtitle">Enter the OTP sent to your email</p>

                    <form onSubmit={handleSubmit} className="otp-form">
                        <div className="otp-inputs">
                            {otp.map((data, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    maxLength="1"
                                    value={data}
                                    onChange={(e) => handleChange(e.target, index)}
                                    onKeyDown={(e) => handleBackspace(e, index)}
                                    ref={(el) => (inputRefs.current[index] = el)}
                                    required
                                />
                            ))}
                        </div>

                        <button type="submit" className="btn-verify" disabled={loading}>
                            {loading ? "Verifying..." : "Verify OTP"}
                        </button>
                    </form>

                    <div className="resend">
                        Didn't receive OTP?
                        <button type="button" onClick={handleResend}> Resend</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
