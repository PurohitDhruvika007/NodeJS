import React, { useState, useEffect, useMemo } from "react";
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

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            setLoading(true);

            const token = localStorage.getItem("token");

            const [studentRes, adminRes] = await Promise.all([
                axios.get(`${Base_admin_url}students`, {
                    headers: { Authorization: `Bearer ${token}` }
                }),
                axios.get(`${Base_admin_url}profile`, {
                    headers: { Authorization: `Bearer ${token}` }
                })
            ]);

            // ✅ IMPORTANT FIX HERE
            const studentData = Array.isArray(studentRes.data?.students)
                ? studentRes.data.students
                : Array.isArray(studentRes.data)
                    ? studentRes.data
                    : [];

            setStudents(studentData);

            setAdmin(adminRes.data?.admin || adminRes.data || null);

        } catch (error) {
            console.error("Dashboard Error:", error.response?.data || error.message);
            setStudents([]); // safety fallback
        } finally {
            setLoading(false);
        }
    };

    const filteredStudents = useMemo(() => {
        if (!Array.isArray(students)) return [];

        return students.filter((student) => {
            const nameMatch = student.name
                ?.toLowerCase()
                .includes(searchTerm.toLowerCase());

            const gradeMatch =
                selectedGrade === "All" || student.grade === selectedGrade;

            const attendanceMatch =
                attendanceFilter === "All" ||
                (attendanceFilter === "Above75" && student.attendance >= 75) ||
                (attendanceFilter === "Below75" && student.attendance < 75);

            return nameMatch && gradeMatch && attendanceMatch;
        });
    }, [students, searchTerm, selectedGrade, attendanceFilter]);

    const totalStudents = Array.isArray(students) ? students.length : 0;
    const totalAdmins = admin ? 1 : 0;

    const totalGrades = Array.isArray(students)
        ? [...new Set(students.map((s) => s.grade))].length
        : 0;

    const avgAttendance =
        students.length > 0
            ? (
                students.reduce((sum, s) => sum + (s.attendance || 0), 0) /
                students.length
            ).toFixed(1)
            : 0;

    const gradeCounts = {};
    filteredStudents.forEach((student) => {
        if (student.grade) {
            gradeCounts[student.grade] =
                (gradeCounts[student.grade] || 0) + 1;
        }
    });

    const barData = {
        labels: Object.keys(gradeCounts),
        datasets: [
            {
                label: "Students by Grade",
                data: Object.values(gradeCounts),
                backgroundColor: "#4e73df",
                borderRadius: 8,
            },
        ],
    };

    const pieData = {
        labels: ["Above 75%", "Below 75%"],
        datasets: [
            {
                data: [
                    filteredStudents.filter((s) => s.attendance >= 75).length,
                    filteredStudents.filter((s) => s.attendance < 75).length,
                ],
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

                    <select
                        value={selectedGrade}
                        onChange={(e) => setSelectedGrade(e.target.value)}
                    >
                        <option value="All">All Grades</option>
                        <option value="A">Grade A</option>
                        <option value="B">Grade B</option>
                        <option value="C">Grade C</option>
                    </select>

                    <select
                        value={attendanceFilter}
                        onChange={(e) => setAttendanceFilter(e.target.value)}
                    >
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
