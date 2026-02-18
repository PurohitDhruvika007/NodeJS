import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import Student_navbar from "../../components/Student_navbar/Student_navbar";
import { Base_student_url } from "../../utils/global_variable";
import "./Student_dashboard.css";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Student_dashboard() {
    const [summary, setSummary] = useState(null);
    const [grades, setGrades] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                setLoading(true);

                // ✅ Summary: total subjects, avg marks, attendance %
                const summaryRes = await axios.get(`${Base_student_url}dashboard`, { withCredentials: true });
                setSummary(summaryRes.data);

                // ✅ Grades for performance graph
                const gradesRes = await axios.get(`${Base_student_url}grades`, { withCredentials: true });
                const flatGrades = [];
                gradesRes.data.forEach(term => {
                    term.grades.forEach(g => {
                        flatGrades.push({ subject: g.subject, marks: g.marks, term: term.term });
                    });
                });
                setGrades(flatGrades);

            } catch (err) {
                setError(err.response?.data?.message || "Failed to load dashboard");
            } finally {
                setLoading(false);
            }
        };

        fetchDashboard();
    }, []);

    if (loading) return <div className="loading">Loading dashboard...</div>;
    if (error) return <div className="error-msg">{error}</div>;

    // ✅ Prepare chart data
    const chartData = {
        labels: grades.map(g => g.subject),
        datasets: [
            {
                label: "Marks",
                data: grades.map(g => g.marks),
                backgroundColor: grades.map(g => {
                    if (g.term === "Term 1") return "#4caf50";
                    if (g.term === "Term 2") return "#2196f3";
                    return "#ff9800";
                })
            }
        ]
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: { position: "top" },
            title: { display: true, text: "Performance Graph (Marks by Subject)" }
        },
        scales: {
            y: { beginAtZero: true, max: 100 }
        }
    };

    return (
        <>
            <Student_navbar />
            <div className="dashboard-container">
                <h2>Student Dashboard</h2>

                {/* Summary Cards */}
                <div className="summary-cards">
                    <div className="card">
                        <h3>Total Subjects</h3>
                        <p>{summary.totalSubjects}</p>
                    </div>
                    <div className="card">
                        <h3>Average Marks</h3>
                        <p>{summary.averageMarks}</p>
                    </div>
                    <div className="card">
                        <h3>Attendance %</h3>
                        <p>{summary.attendancePercentage}%</p>
                    </div>
                </div>

                {/* Performance Graph */}
                <div className="graph-card">
                    <Bar data={chartData} options={chartOptions} />
                </div>
            </div>
        </>
    );
}
