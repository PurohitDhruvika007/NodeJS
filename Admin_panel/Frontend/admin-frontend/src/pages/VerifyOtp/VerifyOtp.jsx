import axios from 'axios';
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { Base_auth_url } from '../../utils/globalVariable.js';

export default function VerifyOtp() {
    const [otp, setOtp] = useState("");
    const location = useLocation();
    const navigate = useNavigate();
    const user = location.state;

    const handleVerifyOtp = async () => {
        if (!user) {
            alert("Session expired. Please login again.");
            navigate("/", { replace: true });
            return;
        }

        const check = { ...user, otp };
        const res = await axios.post(
            `${Base_auth_url}/verifyOtp`,
            check,
            { withCredentials: true }
        );

        alert(res.data.message);


    };

    const handleResendOtp = async () => {
        if (!user) return;
        const res = await axios.post(
            `${Base_auth_url}/signin`,
            user,
            { withCredentials: true }
        );
        alert(res.data.message);
    };

    return (
        <div className='container vh-100 d-flex align-items-center justify-content-center'>
            <div className='col-4 border rounded p-4 shadow'>
                <h1 className='text-center'>Verify OTP</h1>

                <input
                    type="number"
                    className="form-control mb-3"
                    placeholder="OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                />

                <button className='btn btn-primary w-100' onClick={handleVerifyOtp}>
                    Verify
                </button>

                <div className='mt-3 text-center'>
                    <button className="btn btn-link p-0" onClick={handleResendOtp}>
                        resend OTP
                    </button>
                </div>
            </div>
        </div>
    );
}

