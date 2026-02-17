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
    const [students, setStudents] = useState([]);
    const [admin, setAdmin] = useState(null);
    const [loading, setLoading] = useState(true);

    const [selectedGrade, setSelectedGrade] = useState("All");
    const [attendanceFilter, setAttendanceFilter] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");

    // Analytics data for charts
    const [gradesStats, setGradesStats] = useState([]);
    const [attendanceStats, setAttendanceStats] = useState([]);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem("token");

            // Fetch students, admin profile, and analytics in parallel
            const [studentRes, adminRes, analyticsRes] = await Promise.all([
                axios.get(`${Base_admin_url}students`, {
                    headers: { Authorization: `Bearer ${token}` },
                }),
                axios.get(`${Base_admin_url}profile`, {
                    headers: { Authorization: `Bearer ${token}` },
                }),
                axios.get(`${Base_admin_url}analytics`, {
                    headers: { Authorization: `Bearer ${token}` },
                }),
            ]);

            // Students array
            const studentData = Array.isArray(studentRes.data?.students)
                ? studentRes.data.students
                : Array.isArray(studentRes.data)
                    ? studentRes.data
                    : [];
            setStudents(studentData);

            // Admin object
            setAdmin(adminRes.data?.admin || adminRes.data || null);

            // Analytics
            setGradesStats(analyticsRes.data?.gradesStats || []);
            setAttendanceStats(analyticsRes.data?.attendanceStats || []);
        } catch (error) {
            console.error("Dashboard Error:", error.response?.data || error.message);
            setStudents([]);
            setGradesStats([]);
            setAttendanceStats([]);
        } finally {
            setLoading(false);
        }
    };

    // Filtered students for search, grade & attendance filters
    const filteredStudents = students.filter((student) => {
        const nameMatch = student.name?.toLowerCase().includes(searchTerm.toLowerCase());
        const gradeMatch = selectedGrade === "All" || student.grade === selectedGrade;
        const attendanceMatch =
            attendanceFilter === "All" ||
            (attendanceFilter === "Above75" && student.attendance >= 75) ||
            (attendanceFilter === "Below75" && student.attendance < 75);
        return nameMatch && gradeMatch && attendanceMatch;
    });

    // Stats cards
    const totalStudents = students.length;
    const totalAdmins = admin ? 1 : 0;
    const totalGrades = [...new Set(students.map((s) => s.grade))].length;
    const avgAttendance =
        students.length > 0
            ? (students.reduce((sum, s) => sum + (s.attendance || 0), 0) / students.length).toFixed(1)
            : 0;

    // Bar chart (Grades)
    const barData = {
        labels: gradesStats.map((g) => g._id),
        datasets: [
            {
                label: "Students by Grade",
                data: gradesStats.map((g) => g.count),
                backgroundColor: "#4e73df",
                borderRadius: 8,
            },
        ],
    };

    // Pie chart (Attendance)
    const pieData = {
        labels: attendanceStats.map((a) => (a._id === "Above75" ? "Above 75%" : "Below 75%")),
        datasets: [
            {
                data: attendanceStats.map((a) => a.count),
                backgroundColor: ["#1cc88a", "#e74a3b"],
            },
        ],
    };

    if (loading) {
        return (
            <>
                <Admin_navbar />
                <div className="dashboard-container">
                    <h2>Loading Dashboard...</h2>
                </div>
            </>
        );
    }

    return (
        <>
            <Admin_navbar />

            <div className="dashboard-container">
                <div className="stats-grid">
                    <div className="stat-card blue">
                        <h4>Total Students</h4>
                        <p>{totalStudents}</p>
                    </div>

                    <div className="stat-card green">
                        <h4>Total Admin</h4>
                        <p>{totalAdmins}</p>
                    </div>

                    <div className="stat-card purple">
                        <h4>Total Grades</h4>
                        <p>{totalGrades}</p>
                    </div>

                    <div className="stat-card orange">
                        <h4>Avg Attendance</h4>
                        <p>{avgAttendance}%</p>
                    </div>
                </div>

                <div className="filter-section">
                    <input
                        type="text"
                        placeholder="🔍 Search student name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />

                    <select value={selectedGrade} onChange={(e) => setSelectedGrade(e.target.value)}>
                        <option value="All">All Grades</option>
                        <option value="A">Grade A</option>
                        <option value="B">Grade B</option>
                        <option value="C">Grade C</option>
                    </select>

                    <select value={attendanceFilter} onChange={(e) => setAttendanceFilter(e.target.value)}>
                        <option value="All">All Attendance</option>
                        <option value="Above75">Above 75%</option>
                        <option value="Below75">Below 75%</option>
                    </select>
                </div>

                <div className="chart-container">
                    <div className="chart-box">
                        <h3>Grade Distribution</h3>
                        <Bar data={barData} />
                    </div>

                    <div className="chart-box">
                        <h3>Attendance Overview</h3>
                        <Pie data={pieData} />
                    </div>
                </div>
            </div>
        </>
    );
}
