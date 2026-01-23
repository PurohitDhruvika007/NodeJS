import axios from 'axios';
import React, { useState } from 'react'
import { Base_auth_url } from '../../utils/globalVariable';

export default function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleSignup = async () => {
        const user = { email, password };
        const res = await axios.post(`${Base_auth_url}/signup`, user);
        alert(res.data.message);
    }
    return (
        <div>
            <div>
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='enter the email...' />
            </div>
            <div>
                <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='enter the password...' />
            </div>
            <div>
                <button onClick={handleSignup}>Signup</button>
            </div>
        </div>
    )
}
