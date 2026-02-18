import React, { useEffect, useState } from "react";
import axios from "axios";
import Student_navbar from "../../components/Student_navbar/Student_navbar";
import { Base_student_url } from "../../utils/global_variable";
import "./Student_grade.css";

export default function Student_grade() {
    const [grades, setGrades] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchGrades = async () => {
            try {
                const res = await axios.get(`${Base_student_url}grades`, { withCredentials: true });
                setGrades(res.data);
            } catch (err) {
                setError(err.response?.data?.message || "Failed to load grades");
            } finally {
                setLoading(false);
            }
        };
        fetchGrades();
    }, []);

    if (loading) return <div className="loading">Loading grades...</div>;
    if (error) return <div className="error-msg">{error}</div>;
    if (!grades.length) return <div className="no-data">No grades found.</div>;

    return (
        <>
            <Student_navbar />
            <div className="grades-container">
                <h2>My Grades</h2>

                {grades.map((termData) => (
                    <div key={termData.term} className="term-card">
                        <h3>{termData.term}</h3>
                        <table className="grades-table">
                            <thead>
                                <tr>
                                    <th>Subject</th>
                                    <th>Marks Obtained</th>
                                    <th>Max Marks</th>
                                </tr>
                            </thead>
                            <tbody>
                                {termData.grades.map((g, idx) => (
                                    <tr key={idx}>
                                        <td>{g.subject}</td>
                                        <td>{g.marks}</td>
                                        <td>{g.maxMarks}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="term-summary">
                            <p><strong>Total:</strong> {termData.totalMarks} / {termData.maxMarks}</p>
                            <p><strong>Percentage:</strong> {termData.percentage}%</p>
                            <p><strong>Grade:</strong> {termData.grade}</p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
