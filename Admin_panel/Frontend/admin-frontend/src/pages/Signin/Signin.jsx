import axios from 'axios';
import React, { useState } from 'react'
import { Base_auth_url } from '../../utils/globalVariable.js';

export default function Signin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [otp, setOtp] = useState("");
    const handleSignin = async () => {
        const user = { email, password }
        const res = await axios.post(`${Base_auth_url}/signin`, user);
        alert(res.data.message);
    }
    const handleVerifyOtp = async () => {
        const user = { email, otp };
        const res = await axios.post(`${Base_auth_url}/verifyOtp`, user, { withCredentials: true });
        alert(res.data.message);
    }
    return (
        <div>
            <h1>Signin page</h1>
            <div>
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='enter the email..' />
            </div>
            <div>
                <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='enter the password..' />
            </div>
            <div>
                <button onClick={handleSignin}>Signin</button>
            </div>
            <div>
                <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} placeholder='enter the otp..' />
            </div>
            <div>
                <button onClick={handleVerifyOtp}>VerifyOTP</button>
            </div>
        </div>
    )
}
