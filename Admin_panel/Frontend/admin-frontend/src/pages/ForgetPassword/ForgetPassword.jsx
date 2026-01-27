import axios from 'axios';
import React, { useState } from 'react'
import { Base_auth_url } from '../../utils/globalVariable.js';
import { useNavigate } from 'react-router';

export default function ForgetPassword() {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();
    const handleSendOtp = async () => {
        try {
            const res = await axios.post(`${Base_auth_url}/forgetPassword`, { email }, { withCredentials: true });
            if (res.data.status) {
                alert(res.data.message);
                navigate("/verify-forget-password", { state: email })

            }
        }
        catch (err) {
            alert(err.message);
        }
    }
    return (
        <div>
            <div className='container vh-100 d-flex align-items-center justify-content-center'>
                <div className='col-4 border rounded rounded-4 p-4 shadow'>
                    <h1 className='text-center'>forget password</h1>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Email :</label>
                        <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className='mb-4 d-flex justify-content-center'>
                        <button className='btn btn-primary w-100' onClick={handleSendOtp}>send OTP</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
