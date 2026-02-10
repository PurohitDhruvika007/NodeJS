import React, { useEffect, useState } from 'react'
import { Base_auth_url, Base_user_url } from '../../utils/globalVariable.js';
import axios from 'axios';
import { useNavigate } from 'react-router';

export default function AddEmployees() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    const getAllUsersData = async () => {
        try {
            const res = await axios.get(`${Base_user_url}/getAllUsers`, { withCredentials: true });
            if (res.data.status) {
                setUsers(res.data.users);
            }
        }
        catch (err) {
            alert(err.message);
        }
    }

    useEffect(() => {
        getAllUsersData();
    }, []);

    const handleAddEmployees = async () => {
        try {
            const res = await axios.post(`${Base_auth_url}/signup`, { email, password });
            if (res.data.status) {
                alert("employee added successfully");
                getAllUsersData();
            }
        }
        catch (err) {
            alert(err.message);
        }
    }

    const handleDeleteEmployees = async (id) => {
        try {
            const res = await axios.delete(`${Base_user_url}/deleteUser?id=${id}`)
            if (res.data.status) {
                alert("data deleted successfully");
                getAllUsersData();
            }
        }
        catch (err) {
            alert(res.message);
        }
    }

    return (
        <div>
            <div className='container'>
                <div>
                    <h1>Add Employees</h1>
                    <div className='d-flex justify-content-between gap-4'>
                        <div className="mb-3 col-4">
                            <label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
                        </div>
                        <div className="mb-3 col-4">
                            <label htmlFor="exampleFormControlInput2" className="form-label">Password</label>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" id="exampleFormControlInput2" placeholder="enter password" />
                        </div>
                        <div>
                            <div className='d-flex align-items-center mt-4'>
                                <button className='btn btn-primary' onClick={handleAddEmployees}>Add Employees</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Role</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map((user, i) => <tr key={i}>
                                    <th scope="row">{i + 1}</th>
                                    <th>{user.name ? user.name : "not assign"}</th>
                                    <td>{user.email ? user.email : "not assign"}</td>
                                    <td>{user.role ? user.role : "not assign"}</td>
                                    <td><div className='d-flex gap-3'>
                                        <button className='btn btn-warning' onClick={() => {
                                            navigate("/edit-employees", { state: user });
                                        }}>Edit</button>
                                        <button className='btn btn-danger' onClick={() => handleDeleteEmployees(user._id)}>delete</button>
                                    </div></td>
                                </tr>)
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
