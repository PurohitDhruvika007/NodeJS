import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { Base_user_url } from '../../utils/globalVariable.js'

export default function EditEmployees() {

    const { state } = useLocation();   // getting clicked user
    const navigate = useNavigate();

    const [currentUserData, setCurrentUserData] = useState({});

    useEffect(() => {
        if (state) {
            setCurrentUserData(state);
        }
    }, [state]);

    const handleUpdateUser = async () => {
        try {

            const sendData = {
                _id: currentUserData._id,   // auth id
                email: currentUserData.email,
                name: currentUserData.user?.name,
                phone: currentUserData.user?.phone,
                address: currentUserData.user?.address,
                education: currentUserData.user?.education,
                age: currentUserData.user?.age,
                experience: currentUserData.user?.experience,
                role: currentUserData.user?.role
            };

            console.log("Sending Data:", sendData);

            const res = await axios.put(
                `${Base_user_url}/updateUser`,
                sendData,
                { withCredentials: true }
            );

            alert(res.data.message);
            navigate("/add-employees");

        } catch (err) {
            alert(err.message);
        }
    };


    return (
        <div>
            <div className='container'>
                <h1 className='text-center'>Profile Page</h1>

                <div className='d-flex justify-content-center'>
                    <img
                        src="https://img.freepik.com/free-vector/woman-with-braided-hair-illustration_1308-174675.jpg"
                        alt="profile"
                        style={{ height: "250px", width: "250px" }}
                        className='rounded-circle m-4'
                    />
                </div>

                {/* EMAIL */}
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        disabled
                        className="form-control"
                        value={currentUserData.email ?? ""}
                    />
                </div>

                {/* NAME */}
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        value={currentUserData.user?.name ?? ""}
                        onChange={(e) =>
                            setCurrentUserData({
                                ...currentUserData,
                                user: {
                                    ...currentUserData.user,
                                    name: e.target.value
                                }
                            })
                        }
                    />
                </div>

                {/* PHONE */}
                <div className="mb-3">
                    <label className="form-label">Phone</label>
                    <input
                        type="text"
                        className="form-control"
                        value={currentUserData.user?.phone ?? ""}
                        onChange={(e) =>
                            setCurrentUserData({
                                ...currentUserData,
                                user: {
                                    ...currentUserData.user,
                                    phone: e.target.value
                                }
                            })
                        }
                    />
                </div>

                {/* ADDRESS */}
                <div className="mb-3">
                    <label className="form-label">Address</label>
                    <input
                        type="text"
                        className="form-control"
                        value={currentUserData.user?.address ?? ""}
                        onChange={(e) =>
                            setCurrentUserData({
                                ...currentUserData,
                                user: {
                                    ...currentUserData.user,
                                    address: e.target.value
                                }
                            })
                        }
                    />
                </div>

                {/* EDUCATION */}
                <div className="mb-3">
                    <label className="form-label">Education</label>
                    <select
                        className="form-select"
                        value={currentUserData.user?.education ?? ""}
                        onChange={(e) =>
                            setCurrentUserData({
                                ...currentUserData,
                                user: {
                                    ...currentUserData.user,
                                    education: e.target.value
                                }
                            })
                        }
                    >
                        <option value="">Select Education</option>
                        <option value="bca">BCA</option>
                        <option value="bba">BBA</option>
                        <option value="b tech">B Tech</option>
                        <option value="bcom">Bcom</option>
                    </select>
                </div>

                {/* AGE */}
                <div className="mb-3">
                    <label className="form-label">Age</label>
                    <input
                        type="number"
                        className="form-control"
                        value={currentUserData.user?.age ?? ""}
                        onChange={(e) =>
                            setCurrentUserData({
                                ...currentUserData,
                                user: {
                                    ...currentUserData.user,
                                    age: e.target.value
                                }
                            })
                        }
                    />
                </div>

                {/* EXPERIENCE */}
                <div className="mb-3">
                    <label className="form-label">Experience</label>
                    <input
                        type="text"
                        className="form-control"
                        value={currentUserData.user?.experience ?? ""}
                        onChange={(e) =>
                            setCurrentUserData({
                                ...currentUserData,
                                user: {
                                    ...currentUserData.user,
                                    experience: e.target.value
                                }
                            })
                        }
                    />
                </div>

                {/* ROLE */}
                <div className="mb-3">
                    <label className="form-label">Role</label>
                    <select
                        className="form-select"
                        value={currentUserData.user?.role ?? ""}
                        onChange={(e) =>
                            setCurrentUserData({
                                ...currentUserData,
                                user: {
                                    ...currentUserData.user,
                                    role: e.target.value
                                }
                            })
                        }
                    >
                        <option value="">Select Role</option>
                        <option value="web developer">Web developer</option>
                        <option value="financer">Financer</option>
                        <option value="admin">Admin</option>
                        <option value="hr">HR</option>
                    </select>
                </div>

                <div className='d-flex justify-content-center p-3'>
                    <button className='btn btn-primary' onClick={handleUpdateUser}>
                        Update Profile
                    </button>
                </div>
            </div>
        </div>
    );
}
