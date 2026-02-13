import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { Base_user_url } from '../../utils/globalVariable.js'

export default function Profile() {

    const [currentUserData, setCurrentUserData] = useState({});

    const getUser = async () => {
        try {
            const res = await axios.get(`${Base_user_url}/getUser`, { withCredentials: true });
            setCurrentUserData(res.data.user);
        }
        catch (err) {
            alert(err.message);
        }
    }

    const handleUpdateUser = async (req, res) => {
        try {
            const res = await axios.put(`${Base_user_url}/updateUser`, currentUserData, { withCredentials: true });
            alert(res.data.message)
        }
        catch (err) {
            alert(err.message)
        }
    }

    useEffect(() => {
        getUser();
    }, [])

    return (
        <div>
            <div className='container'>
                <h1 className='text-center'>profile page</h1>
                <div className='d-flex justify-content-center'>
                    <img src="https://img.freepik.com/free-vector/woman-with-braided-hair-illustration_1308-174675.jpg?semt=ais_hybrid&w=740&q=80" alt="image not loaded" style={{ height: "250px", width: "250px" }} className='rounded-circle m-4 ' />
                </div>
                <div className='d-flex gap-4 justify-content-evenly px-4'>
                    <div className="mb-3 col-6">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Email</label>
                        <input type="email" disabled={true} value={currentUserData.email ?? ""} onChange={(e) => setCurrentUserData({ ...currentUserData, email: e.target.value })} className="form-control" id="exampleFormControlInput1" placeholder="enter the email.." />
                    </div>
                    <div className="mb-3 col-6">
                        <label htmlFor="exampleFormControlInput2" className="form-label">Name</label>
                        <input type="text" className="form-control" value={currentUserData.name ?? ""} onChange={(e) => setCurrentUserData({ ...currentUserData, name: e.target.value })} id="exampleFormControlInput2" placeholder="enter the name.." />
                    </div>
                </div>
                <div className='d-flex gap-4 justify-content-evenly px-4'>
                    <div className="mb-3 col-6">
                        <label htmlFor="exampleFormControlInput3" className="form-label">Phone</label>
                        <input type="text" className="form-control" value={currentUserData.phone ?? ""} onChange={(e) => setCurrentUserData({ ...currentUserData, phone: e.target.value })} id="exampleFormControlInput3" placeholder="enter the phone.." />
                    </div>
                    <div className="mb-3 col-6">
                        <label htmlFor="exampleFormControlInput4" className="form-label">Address</label>
                        <input type="text" className="form-control" value={currentUserData.address ?? ""} onChange={(e) => setCurrentUserData({ ...currentUserData, address: e.target.value })} id="exampleFormControlInput4" placeholder="enter the address.." />
                    </div>
                </div>
                <div className='d-flex gap-4 justify-content-evenly px-4'>
                    <div className="mb-3 col-3">
                        <label htmlFor="exampleFormControlInput5" className="form-label">Education</label>
                        <select
                            className="form-select"
                            value={currentUserData.education ?? ""}
                            onChange={(e) =>
                                setCurrentUserData({
                                    ...currentUserData,
                                    education: e.target.value
                                })
                            }
                        >
                            <option value="">select the education</option>
                            <option value="bca">BCA</option>
                            <option value="bba">BBA</option>
                            <option value="b tech">B Tech</option>
                            <option value="bcom">Bcom</option>
                        </select>

                    </div>
                    <div className="mb-3 col-3">
                        <label htmlFor="exampleFormControlInput6" className="form-label">Age</label>
                        <input
                            type="number"
                            className="form-control"
                            value={currentUserData.age ?? ""}
                            onChange={(e) =>
                                setCurrentUserData({
                                    ...currentUserData,
                                    age: e.target.value
                                })
                            }
                            placeholder="age"
                        />

                    </div>
                    <div className="mb-3 col-3">
                        <label htmlFor="exampleFormControlInput7" className="form-label">Experience</label>
                        <input
                            type="text"
                            className="form-control"
                            value={currentUserData.experience ?? ""}
                            onChange={(e) =>
                                setCurrentUserData({
                                    ...currentUserData,
                                    experience: e.target.value
                                })
                            }
                            placeholder="experience"
                        />

                    </div>
                    <div className="mb-3 col-3">
                        <label htmlFor="exampleFormControlInput8" className="form-label">Role</label>
                        <select
                            className="form-select"
                            value={currentUserData.role ?? ""}
                            onChange={(e) =>
                                setCurrentUserData({
                                    ...currentUserData,
                                    role: e.target.value
                                })
                            }
                        >
                            <option value="">select the role</option>
                            <option value="web developer">Web developer</option>
                            <option value="financer">Financer</option>
                            <option value="admin">Admin</option>
                            <option value="hr">HR</option>
                        </select>

                    </div>
                </div>
                <div className='d-flex justify-content-center p-3'>
                    <button className='btn btn-primary' onClick={handleUpdateUser}>Update Profile</button>
                </div>
            </div>
        </div>
    )
}
