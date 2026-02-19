import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar, Pie } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";

import Admin_navbar from "../../components/Admin_navbar/Admin_navbar";
import { Base_admin_url } from "../../utils/global_variable";
import "./Admin_dashboard.css";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);
axios.defaults.withCredentials = true;

export default function Admin_dashboard() {
    const [dashboardData, setDashboardData] = useState({});
    const [students, setStudents] = useState([]);
    const [gradesStats, setGradesStats] = useState([]);
    const [attendanceStats, setAttendanceStats] = useState([]);
    const [loading, setLoading] = useState(true);

    const [selectedGrade, setSelectedGrade] = useState("All");
    const [attendanceFilter, setAttendanceFilter] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem("token");

            const [studentsRes, dashboardRes, analyticsRes] = await Promise.all([
                axios.get(`${Base_admin_url}students`, { headers: { Authorization: `Bearer ${token}` } }),
                axios.get(`${Base_admin_url}dashboard`, { headers: { Authorization: `Bearer ${token}` } }),
                axios.get(`${Base_admin_url}analytics`, { headers: { Authorization: `Bearer ${token}` } }),
            ]);

            setStudents(studentsRes.data || []);
            setDashboardData(dashboardRes.data || {});
            setGradesStats(analyticsRes.data?.gradesStats || []);
            setAttendanceStats(analyticsRes.data?.attendanceStats || []);

        } catch (error) {
            console.error("Dashboard Error:", error.response?.data || error.message);
        } finally {
            setLoading(false);
        }
    };

    // Filter students
    const filteredStudents = students.filter((s) => {
        const nameMatch = s.userId?.name?.toLowerCase().includes(searchTerm.toLowerCase());
        const gradeMatch = selectedGrade === "All" || s.grade === selectedGrade;
        const attendanceMatch =
            attendanceFilter === "All" ||
            (attendanceFilter === "Above75" && s.attendancePercentage >= 75) ||
            (attendanceFilter === "Below75" && s.attendancePercentage < 75);
        return nameMatch && gradeMatch && attendanceMatch;
    });

    // Bar chart data
    const barData = {
        labels: filteredStudents.map(s => s.userId?.name || "Unknown"),
        datasets: [
            {
                label: "Average Marks",
                data: filteredStudents.map(s => s.averageMarks || 0),
                backgroundColor: "#4e73df",
                borderRadius: 6,
            },
        ],
    };

    const barOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        return `${context.dataset.label}: ${context.parsed.y}`;
                    },
                },
            },
        },
        scales: {
            x: {
                ticks: { autoSkip: false, maxRotation: 45, minRotation: 0 },
            },
            y: {
                beginAtZero: true,
                ticks: { stepSize: 10 },
            },
        },
    };

    // Pie chart
    const pieData = {
        labels: ["Above 75%", "Below 75%"],
        datasets: [
            {
                data: [
                    attendanceStats.find(a => a._id === "Above75")?.count || 0,
                    attendanceStats.find(a => a._id === "Below75")?.count || 0,
                ],
                backgroundColor: ["#1cc88a", "#e74a3b"],
                hoverOffset: 15,
            },
        ],
    };

    const pieOptions = {
        responsive: true,
        maintainAspectRatio: false,
        aspectRatio: 1,
        plugins: {
            legend: { position: "bottom", labels: { font: { size: 14 }, color: "#333" } },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        const total = context.dataset.data.reduce((a, b) => a + b, 0);
                        const value = context.parsed;
                        const percent = total ? ((value / total) * 100).toFixed(1) : 0;
                        return `${context.label}: ${value} (${percent}%)`;
                    },
                },
            },
        },
    };

    if (loading) {
        return (
            <>
                <div className="main-dashboard">
                    <Admin_navbar />
                    <div className="dashboard-container">
                        <h2>Loading Dashboard...</h2>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <Admin_navbar />
            <div className="dashboard-container">

                {/* STATS CARDS */}
                <div className="stats-grid">
                    <div className="stat-card blue">
                        <h4>Total Students</h4>
                        <p>{dashboardData.totalStudents || 0}</p>
                    </div>
                    <div className="stat-card green">
                        <h4>Total Admin</h4>
                        <p>{dashboardData.totalAdmins || 0}</p>
                    </div>
                    <div className="stat-card purple">
                        <h4>Total Grades</h4>
                        <p>{dashboardData.totalGrades || 0}</p>
                    </div>
                    <div className="stat-card orange">
                        <h4>Avg Attendance</h4>
                        <p>{dashboardData.attendancePercentage || 0}%</p>
                    </div>
                </div>

                {/* FILTER SECTION */}
                <div className="filter-section">
                    <input
                        type="text"
                        placeholder="🔍 Search student name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <select value={selectedGrade} onChange={(e) => setSelectedGrade(e.target.value)}>
                        <option value="All">All Grades</option>
                        <option value="A+">A+</option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                        <option value="D">D</option>
                    </select>
                    <select value={attendanceFilter} onChange={(e) => setAttendanceFilter(e.target.value)}>
                        <option value="All">All Attendance</option>
                        <option value="Above75">Above 75%</option>
                        <option value="Below75">Below 75%</option>
                    </select>
                </div>

                {/* CHART SECTION */}
                {/* ================= CHART SECTION ================= */}
                <div className="chart-container">
                    <div className="chart-box">
                        <h3>Grade Distribution</h3>
                        <div className="bar-wrapper">
                            <Bar data={barData} options={barOptions} />
                        </div>
                    </div>

                    <div className="chart-box">
                        <h3>Attendance Overview</h3>
                        <div className="pie-wrapper">
                            <Pie data={pieData} options={pieOptions} />
                        </div>
                    </div>
                </div>


                {/* STUDENT TABLE */}
                <div className="student-list">
                    <h3>Students</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Course</th>
                                <th>Roll No</th>
                                <th>Contact</th>
                                <th>Grade</th>
                                <th>Attendance</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredStudents.map((s) => (
                                <tr key={s._id}>
                                    <td>{s.userId?.name}</td>
                                    <td>{s.userId?.email}</td>
                                    <td>{s.course}</td>
                                    <td>{s.roll_no}</td>
                                    <td>{s.contact}</td>
                                    <td>{s.grade}</td>
                                    <td>{s.attendancePercentage}%</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </>
    );
}
