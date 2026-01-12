import { useState } from "react";
import api from "../../utils/api.js";
import { useNavigate } from "react-router-dom";
import "./OtpVerification.css";

const OtpVerification = () => {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const navigate = useNavigate();

    const verify = async (e) => {
        e.preventDefault();
        await api.post("/auth/verify-otp", { email, otp });
        navigate("/login");
    };

    return (
        <div className="otp-wrapper">
            <div className="otp-card">
                <h1>Verify OTP 🔐</h1>
                <p>Enter the OTP sent to your email</p>

                <form onSubmit={verify}>
                    <label>Email</label>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />

                    <label>OTP</label>
                    <input
                        type="text"
                        placeholder="Enter 6-digit OTP"
                        value={otp}
                        onChange={e => setOtp(e.target.value)}
                        required
                    />

                    <button type="submit">Verify</button>
                </form>
            </div>
        </div>
    );
};

export default OtpVerification;
