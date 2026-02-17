import React, { useEffect, useState } from 'react'
import { Base_auth_url, Base_department_url, Base_user_url } from '../../utils/globalVariable.js';
import axios from 'axios';
import { useNavigate } from 'react-router';

export default function AddEmployees() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [department, setDepartment] = useState("");
    const [users, setUsers] = useState([]);
    const [skip, setSkip] = useState(0);
    const navigate = useNavigate();

    const getAllUsersData = async () => {
        try {
            const res = await axios.get(`${Base_user_url}/getAllUsers?skip=${skip}&limit=5`, { withCredentials: true });
            if (res.data.status) {
                setUsers(res.data.users);
            }
        }
        catch (err) {
            alert(err.message);
        }
    }

    const handleAddDepartments = async () => {
        try {
            const res = await axios.post(`${Base_department_url}?name=${department}`);
            if (res.data.status) {
                alert(res.data.message);
            }
        }
        catch (err) {
            alert(err.message)
        }
    }

    useEffect(() => {
        getAllUsersData();

    }, [skip]);

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
            alert(err.message);
        }
    }

    return (
        <div className='container'>
            <h1>Add Employees</h1>
            <div className='d-flex justify-content-between gap-4 mb-3'>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className=" col-4" placeholder="Email" />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className=" col-4" placeholder="Password" />
                <button className='btn btn-primary' onClick={handleAddEmployees}>Add Employee</button>
            </div>
            <div className='d-flex justify-content-between gap-4 mb-3'>
                <input type="text" value={department} onChange={(e) => setDepartment(e.target.value)} className=" col-4" placeholder="department" />

                <button className='btn btn-primary' onClick={handleAddDepartments}>Add departments</button>
            </div>

            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Action</th>
                    </tr>
                </thead>

                {
                    (users.length == 0) ? <h3 className='text-center'>no other data available</h3> :
                        <tbody>
                            {users.map((user, i) => (
                                <tr key={user._id}>
                                    <th>{i + 1}</th>
                                    <td>{user.user?.name || "not assign"}</td>
                                    <td>{user.email || "not assign"}</td>
                                    <td>{user.user?.role || "not assign"}</td>
                                    <td className='d-flex gap-2'>
                                        <button className='btn btn-warning' onClick={() => navigate("/edit-employees", { state: user })}>
                                            Edit
                                        </button>
                                        <button className='btn btn-danger' onClick={() => handleDeleteEmployees(user._id)}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                }


            </table>
            <div>
                <button className='btn btn-primary' onClick={() => {
                    if (skip >= 5) {
                        setSkip(skip - 5)
                    }
                    else {
                        alert("no more previos data")
                    }
                }
                }>--</button>
                <button className='btn btn-primary' onClick={() => {
                    if (users.length == 5) {
                        setSkip(skip + 5)
                    }
                    else {
                        alert("no more data available")
                    }
                }
                }>++</button>
            </div>
        </div>
    )
}
