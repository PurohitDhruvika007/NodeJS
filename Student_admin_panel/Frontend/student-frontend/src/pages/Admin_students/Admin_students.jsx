import React, { useEffect, useState } from "react";
import axios from "axios";
import Admin_navbar from "../../components/Admin_navbar/Admin_navbar";
import { Base_admin_url } from "../../utils/global_variable";
import { useNavigate } from "react-router";
import "./Admin_students.css";

export default function Admin_students() {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    const fetchStudents = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`${Base_admin_url}students`, { withCredentials: true });
            setStudents(res.data);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to fetch students");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this student?")) return;
        try {
            await axios.delete(`${Base_admin_url}delete-student/${id}`, { withCredentials: true });
            fetchStudents();
        } catch (err) {
            alert(err.response?.data?.message || "Delete failed");
        }
    };

    const filteredStudents = students.filter(s => {
        const q = search.toLowerCase();
        return s.userId.name.toLowerCase().includes(q) ||
            (s.course && s.course.toLowerCase().includes(q)) ||
            (s.roll_no && s.roll_no.toLowerCase().includes(q));
    });

    return (
        <>
            <Admin_navbar />
            <div className="students-page">
                <div className="students-header">
                    <h2>All Students</h2>
                    <div className="students-actions">
                        <input
                            type="text"
                            placeholder="Search by name, course or roll no..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <button onClick={() => navigate("/admin-students/add-student")}>+ Add Student</button>
                    </div>
                </div>

                {loading ? (
                    <div className="loading">Loading students...</div>
                ) : error ? (
                    <div className="error">{error}</div>
                ) : filteredStudents.length === 0 ? (
                    <div className="no-students">No students found</div>
                ) : (
                    <div className="students-grid">
                        {filteredStudents.map((s) => (
                            <div className="student-card" key={s._id}>
                                <div className="student-photo">
                                    <img
                                        src={s.photo ? `http://localhost:4000/uploads/${s.photo}` : '/default-avatar.png'}
                                        alt={s.userId.name}
                                    />
                                </div>
                                <h3>{s.userId.name}</h3>
                                <p><strong>Email:</strong> {s.userId.email}</p>
                                <p><strong>Course:</strong> {s.course}</p>
                                <p><strong>Roll No:</strong> {s.roll_no}</p>
                                <p><strong>Contact:</strong> {s.contact}</p>
                                <p><strong>Address:</strong> {s.address}</p>
                                <div className="card-actions">
                                    <button className="btn-edit" onClick={() => navigate(`/admin-students/edit-student`, { state: { id: s._id } })}>Edit</button>
                                    <button className="btn-delete" onClick={() => handleDelete(s._id)}>Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}
