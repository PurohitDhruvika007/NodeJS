import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { Base_auth_url } from '../../utils/globalVariable.js';


export default function Signin() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleSignIn = async () => {
        const user = { email, password };
        const res = await axios.post(`${Base_auth_url}/signin`, user, { withCredentials: true });
        alert(res.data.message);
        if (res.data.status) {
            navigate("/verify-otp", { replace: true, state: user });
        }
    }
    return (
        <div>
            <div className='container vh-100 d-flex align-items-center justify-content-center'>
                <div className='col-4 border rounded rounded-4 p-4 shadow'>
                    <h1 className='text-center'>Sign in</h1>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Email :</label>
                        <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlInput2" className="form-label">password :</label>
                        <input type="password" className="form-control" id="exampleFormControlInput2" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="mb-3 d-flex justify-content-end">
                        <Link to="/forget-password">forget password?</Link>
                    </div>
                    <div className='mb-4 d-flex justify-content-center'>
                        <button className='btn btn-primary w-100' onClick={handleSignIn}>Signin</button>
                    </div>
                    <div className="mb-3">
                        <Link to="/signup">don't have an account? signup here</Link>
                    </div>
                </div>
            </div>
        </div >
    )
}
