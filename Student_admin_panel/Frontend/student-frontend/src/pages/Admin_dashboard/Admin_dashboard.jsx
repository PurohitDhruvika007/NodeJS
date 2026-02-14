import React, { useEffect, useState } from "react";
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

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Tooltip,
    Legend
);

export default function Admin_dashboard() {

    const [students, setStudents] = useState([]);
    const [selectedGrade, setSelectedGrade] = useState("All");
    const [attendanceFilter, setAttendanceFilter] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");
    const [countdown, setCountdown] = useState("");

    // 🔹 Example target date (change as needed)
    const targetDate = new Date("2026-03-01T00:00:00");

    useEffect(() => {
        fetchStudents();
        startCountdown();
    }, []);

    const fetchStudents = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.get(`${Base_admin_url}allStudents`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setStudents(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    // ⏳ Countdown Logic
    const startCountdown = () => {
        setInterval(() => {
            const now = new Date().getTime();
            const distance = targetDate - now;

            if (distance < 0) {
                setCountdown("Event Started");
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((distance / (1000 * 60)) % 60);

            setCountdown(`${days}d ${hours}h ${minutes}m`);
        }, 1000);
    };

    // 🔎 Filtering Logic
    const filteredStudents = students.filter(student => {

        const nameMatch = student.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase());

        const gradeMatch =
            selectedGrade === "All" || student.grade === selectedGrade;

        const attendanceMatch =
            attendanceFilter === "All" ||
            (attendanceFilter === "Above75" && student.attendance >= 75) ||
            (attendanceFilter === "Below75" && student.attendance < 75);

        return nameMatch && gradeMatch && attendanceMatch;
    });

    // 📊 Grade Count
    const gradeCounts = {};
    filteredStudents.forEach(student => {
        gradeCounts[student.grade] =
            (gradeCounts[student.grade] || 0) + 1;
    });

    const barData = {
        labels: Object.keys(gradeCounts),
        datasets: [
            {
                label: "Students by Grade",
                data: Object.values(gradeCounts),
                backgroundColor: [
                    "#3a0ca3",
                    "#7209b7",
                    "#560bad",
                    "#b5179e"
                ],
                borderRadius: 8,
            },
        ],
    };

    const attendanceAbove75 =
        filteredStudents.filter(s => s.attendance >= 75).length;

    const attendanceBelow75 =
        filteredStudents.filter(s => s.attendance < 75).length;

    const pieData = {
        labels: ["Above 75%", "Below 75%"],
        datasets: [
            {
                data: [attendanceAbove75, attendanceBelow75],
                backgroundColor: ["#4cc9f0", "#f72585"],
            },
        ],
    };

    return (
        <>
            <Admin_navbar />

            <div className="dashboard-container">

                {/* ⏳ Countdown Card */}
                <div className="countdown-card">
                    <h3>Exam Countdown</h3>
                    <p>{countdown}</p>
                </div>

                {/* 🔎 Search + Filters */}
                <div className="filter-section">

                    <input
                        type="text"
                        placeholder="Search by student name..."
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

                {/* 📊 Charts */}
                <div className="chart-container">
                    <div className="chart-box">
                        <Bar data={barData} />
                    </div>

                    <div className="chart-box">
                        <Pie data={pieData} />
                    </div>
                </div>

            </div>
        </>
    );
}
