import React, { useState } from 'react'
import { useLocation, useNavigate } from "react-router"
import axios from 'axios';
import OTPInput from "otp-input-react"

import { Base_auth_url } from '../../utils/globalVariable.js';

export default function VerifyForgetPassword() {
    const [otp, setOtp] = useState("");
    const [password, setPassword] = useState("");
    const location = useLocation();
    const navigate = useNavigate();
    const handleChangePassword = async () => {
        const email = location.state;
        const user = { email, otp: Number(otp), password }
        console.log(email, otp, password)
        try {
            const res = await axios.post(`${Base_auth_url}/changeForgetPassword`, user, { withCredentials: true });
            if (res.data.status) {
                alert(res.data.message)
                navigate("/", { replace: true });
            }
            else {
                alert(res.data.message)
            }
        }
        catch (err) {
            alert(err.message)
        }
    }
    return (
        <div>
            <div className='container vh-100 d-flex align-items-center justify-content-center'>
                <div className='col-4 border rounded rounded-4 p-4 shadow'>
                    <h1 className='text-center'>forget password</h1>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label">otp :</label>
                        <div className='my-2'>
                            <OTPInput value={otp} onChange={setOtp} autoFocus OTPLength={6} otpType="number" disabled={false} secure />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlInput2" className="form-label">password :</label>
                        <input type="password" className="form-control" id="exampleFormControlInput2" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className='mb-4 d-flex justify-content-center'>
                        <button className='btn btn-primary w-100' onClick={handleChangePassword}>change Password</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
