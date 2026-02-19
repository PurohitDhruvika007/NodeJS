// Student_dashboard.jsx
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

                const summaryRes = await axios.get(`${Base_student_url}dashboard`, { withCredentials: true });
                setSummary(summaryRes.data);

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

    // ✅ UPDATED GRAPH LOGIC (Mid vs Final Comparison)
    const subjects = [...new Set(grades.map(g => g.subject))];

    const midMarks = subjects.map(subject => {
        const found = grades.find(g => g.subject === subject && g.term === "mid");
        return found ? found.marks : 0;
    });

    const finalMarks = subjects.map(subject => {
        const found = grades.find(g => g.subject === subject && g.term === "final");
        return found ? found.marks : 0;
    });

    const chartData = {
        labels: subjects,
        datasets: [
            {
                label: "Mid Exam",
                data: midMarks,
                backgroundColor: "#4caf50"
            },
            {
                label: "Final Exam",
                data: finalMarks,
                backgroundColor: "#2196f3"
            }
        ]
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: { position: "top" },
            title: { display: true, text: "Performance Graph (Mid vs Final Comparison)" }
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

                <div className="graph-card">
                    <Bar data={chartData} options={chartOptions} />
                </div>
            </div>
        </>
    );
}
