import React, { useEffect, useState } from "react";
import axios from "axios";
import Admin_navbar from "../../components/Admin_navbar/Admin_navbar";
import { Base_admin_url } from "../../utils/global_variable";
import "./Admin_attendance.css";

export default function Admin_attendance() {
    const [students, setStudents] = useState([]);
    const [attendanceData, setAttendanceData] = useState({});
    const [selectedDate, setSelectedDate] = useState(
        new Date().toISOString().split("T")[0]
    );
    const [loading, setLoading] = useState(false);
    const [summary, setSummary] = useState([]);

    // Fetch all students and attendance summary
    useEffect(() => {
        fetchStudents();
        fetchAttendanceSummary();
    }, []);

    const fetchStudents = async () => {
        try {
            const res = await axios.get(`${Base_admin_url}students`, {
                withCredentials: true
            });
            setStudents(res.data);
        } catch (error) {
            console.error("Error fetching students", error);
        }
    };

    const fetchAttendanceSummary = async () => {
        try {
            const res = await axios.get(`${Base_admin_url}attendance-summary`, {
                withCredentials: true
            });
            setSummary(res.data);
        } catch (error) {
            console.error("Error fetching attendance summary", error);
        }
    };

    // Handle status change
    const handleStatusChange = (studentId, status) => {
        setAttendanceData({
            ...attendanceData,
            [studentId]: status
        });
    };

    // Submit attendance
    const handleSubmit = async () => {
        try {
            setLoading(true);

            const requests = Object.entries(attendanceData).map(
                ([studentId, status]) =>
                    axios.post(
                        `${Base_admin_url}attendance`,
                        {
                            studentId,
                            date: selectedDate,
                            status
                        },
                        { withCredentials: true }
                    )
            );

            await Promise.all(requests);
            alert("Attendance saved successfully ✅");
            setAttendanceData({});
            fetchAttendanceSummary(); // Refresh summary after marking attendance
        } catch (error) {
            console.error("Error saving attendance", error);
            alert("Failed to save attendance");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Admin_navbar />
            <div className="attendance-container">
                <h2 className="attendance-title">Student Attendance</h2>

                <div className="attendance-header">
                    <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                    />
                    <button onClick={handleSubmit} disabled={loading}>
                        {loading ? "Saving..." : "Save Attendance"}
                    </button>
                </div>

                <div className="attendance-grid">
                    {students.map((student) => (
                        <div className="attendance-card" key={student._id}>
                            <img
                                src={
                                    student.photo
                                        ? `http://localhost:4000/uploads/${student.photo}`
                                        : "/default-user.png"
                                }
                                alt="student"
                            />
                            <h4>{student.userId?.name}</h4>
                            <p>{student.course}</p>

                            <div className="attendance-buttons">
                                <button
                                    className={
                                        attendanceData[student._id] === "present"
                                            ? "active present"
                                            : ""
                                    }
                                    onClick={() =>
                                        handleStatusChange(student._id, "present")
                                    }
                                >
                                    Present
                                </button>

                                <button
                                    className={
                                        attendanceData[student._id] === "absent"
                                            ? "active absent"
                                            : ""
                                    }
                                    onClick={() =>
                                        handleStatusChange(student._id, "absent")
                                    }
                                >
                                    Absent
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Attendance Summary */}
                <h3 className="summary-title">Attendance Summary</h3>
                <div className="summary-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Student</th>
                                <th>Total Classes</th>
                                <th>Present</th>
                                <th>Percentage</th>
                            </tr>
                        </thead>
                        <tbody>
                            {summary.map((s) => (
                                <tr key={s.studentId}>
                                    <td>{s.name}</td>
                                    <td>{s.total}</td>
                                    <td>{s.present}</td>
                                    <td>{s.percentage}%</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
