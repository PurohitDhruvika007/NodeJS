import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { Base_auth_url } from '../../utils/globalVariable.js';

export default function Signup() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const handleSignUp = async () => {

        if (password == confirmPassword) {
            const user = { email, password };
            const res = await axios.post(`${Base_auth_url}/signup`, user, { withCredentials: true });
            alert(res.data.message);
            if (res.data.status) {
                navigate("/", { replace: true })
            }
        }
        else {
            alert("password and confirm password not match");
        }
    }
    return (
        <div>
            <div className='container vh-100 d-flex align-items-center justify-content-center'>
                <div className='col-4 border rounded rounded-4 p-4 shadow'>
                    <h1 className='text-center'>Sign up</h1>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Email :</label>
                        <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlInput2" className="form-label">password :</label>
                        <input type="password" className="form-control" id="exampleFormControlInput2" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="exampleFormControlInput3" className="form-label">confirm password :</label>
                        <input type="password" className="form-control" id="exampleFormControlInput3" placeholder="confirm password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    </div>

                    <div className='mb-4 d-flex justify-content-center'>
                        <button className='btn btn-primary w-100' onClick={handleSignUp}>Signup</button>
                    </div>
                    <div className="mb-3">
                        <Link to="/">Already have an account? signin</Link>
                    </div>
                </div>
            </div>
        </div >
    )
}
