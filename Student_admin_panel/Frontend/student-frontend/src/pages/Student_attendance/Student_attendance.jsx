import React, { useEffect, useState } from "react";
import axios from "axios";
import Student_navbar from "../../components/Student_navbar/Student_navbar";
import { Base_student_url } from "../../utils/global_variable";
import "./Student_attendance.css";

export default function Student_attendance() {
    const [attendance, setAttendance] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchAttendance = async () => {
            try {
                const res = await axios.get(`${Base_student_url}attendance`, { withCredentials: true });
                setAttendance(res.data);
            } catch (err) {
                setError(err.response?.data?.message || "Failed to load attendance");
            } finally {
                setLoading(false);
            }
        };
        fetchAttendance();
    }, []);

    if (loading) return <div className="loading">Loading attendance...</div>;
    if (error) return <div className="error-msg">{error}</div>;

    return (
        <>
            <Student_navbar />
            <div className="attendance-container">
                <h2>Attendance History</h2>

                {attendance.length === 0 ? (
                    <p className="no-data">No attendance records found.</p>
                ) : (
                    <div className="attendance-card">
                        <table className="attendance-table">
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Status</th>
                                    <th>Remarks</th>
                                </tr>
                            </thead>
                            <tbody>
                                {attendance
                                    .sort((a, b) => new Date(b.date) - new Date(a.date))
                                    .map((att) => (
                                        <tr key={att._id}>
                                            <td>{new Date(att.date).toLocaleDateString()}</td>
                                            <td>
                                                <span className={`status-badge ${att.status}`}>
                                                    {att.status.charAt(0).toUpperCase() + att.status.slice(1)}
                                                </span>
                                            </td>
                                            <td>{att.remarks || "-"}</td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </>
    );
}
