import React, { useEffect, useState } from "react";
import axios from "axios";
import Admin_navbar from "../../components/Admin_navbar/Admin_navbar";
import { Base_admin_url } from "../../utils/global_variable";
import "./Admin_grades.css";

export default function Admin_grades() {
    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState("");
    const [subject, setSubject] = useState("");
    const [marks, setMarks] = useState("");
    const [term, setTerm] = useState("");
    const [grades, setGrades] = useState([]);
    const [average, setAverage] = useState(0);
    const [editingGrade, setEditingGrade] = useState(null);
    const [loading, setLoading] = useState(false);

    // Fetch students
    useEffect(() => {
        axios.get(`${Base_admin_url}students`, { withCredentials: true })
            .then(res => setStudents(res.data))
            .catch(err => console.error(err));
    }, []);

    // Fetch grades when student changes
    useEffect(() => {
        if (selectedStudent) {
            fetchGrades();
        } else {
            setGrades([]);
            setAverage(0);
        }
    }, [selectedStudent]);

    const fetchGrades = async () => {
        try {
            const res = await axios.get(
                `${Base_admin_url}grades/${selectedStudent}`,
                { withCredentials: true }
            );
            setGrades(res.data.grades);
            setAverage(res.data.average);
        } catch (err) {
            console.error(err);
        }
    };

    const resetForm = () => {
        setSubject("");
        setMarks("");
        setTerm("");
        setEditingGrade(null);
    };

    const handleSubmit = async () => {
        if (!selectedStudent) return alert("Select a student");
        if (!subject.trim() || marks === "" || !term.trim())
            return alert("Enter subject, marks and term");

        if (marks < 0 || marks > 100)
            return alert("Marks must be between 0-100");

        try {
            setLoading(true);

            if (editingGrade) {
                // UPDATE
                await axios.put(
                    `${Base_admin_url}grades/${editingGrade._id}`,
                    { subject, marks: Number(marks), term },
                    { withCredentials: true }
                );
            } else {
                // ADD
                await axios.post(
                    `${Base_admin_url}grades`,
                    {
                        studentId: selectedStudent,
                        subject,
                        marks: Number(marks),
                        term
                    },
                    { withCredentials: true }
                );
            }

            resetForm();
            fetchGrades();
        } catch (err) {
            alert(err.response?.data?.message || "Operation failed");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this grade?")) return;

        try {
            await axios.delete(`${Base_admin_url}grades/${id}`, {
                withCredentials: true
            });
            fetchGrades();
        } catch (err) {
            alert("Delete failed");
        }
    };

    return (
        <>
            <Admin_navbar />
            <div className="grades-container">
                <h2>Manage Student Grades</h2>

                <div className="grades-form">
                    <select
                        value={selectedStudent}
                        onChange={(e) => setSelectedStudent(e.target.value)}
                    >
                        <option value="">Select Student</option>
                        {students.map((s) => (
                            <option key={s._id} value={s._id}>
                                {s.userId?.name}
                            </option>
                        ))}
                    </select>

                    <input
                        type="text"
                        placeholder="Subject"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                    />

                    <input
                        type="number"
                        placeholder="Marks (0-100)"
                        value={marks}
                        onChange={(e) => setMarks(e.target.value)}
                    />

                    <input
                        type="text"
                        placeholder="Term (Mid / Final)"
                        value={term}
                        onChange={(e) => setTerm(e.target.value)}
                    />

                    <button onClick={handleSubmit} disabled={loading}>
                        {editingGrade ? "Update Grade" : "Add Grade"}
                    </button>

                    {editingGrade && (
                        <button
                            className="cancel-btn"
                            onClick={resetForm}
                        >
                            Cancel
                        </button>
                    )}
                </div>

                <div className="grades-list">
                    <h3>
                        Grades for{" "}
                        {students.find(s => s._id === selectedStudent)?.userId?.name || ""}
                    </h3>

                    <p className="average-box">
                        Average Score: <strong>{average}</strong>
                    </p>

                    {grades.length === 0 ? (
                        <p>No grades available</p>
                    ) : (
                        <table>
                            <thead>
                                <tr>
                                    <th>Subject</th>
                                    <th>Marks</th>
                                    <th>Letter</th>
                                    <th>Term</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {grades.map((g) => (
                                    <tr
                                        key={g._id}
                                        className={g.marks < 60 ? "fail" : ""}
                                    >
                                        <td>{g.subject}</td>
                                        <td>{g.marks}</td>
                                        <td>{g.letter}</td>
                                        <td>{g.term}</td>
                                        <td className="action-buttons">
                                            <button
                                                className="edit-btn"
                                                onClick={() => {
                                                    setEditingGrade(g);
                                                    setSubject(g.subject);
                                                    setMarks(g.marks);
                                                    setTerm(g.term);
                                                }}
                                            >
                                                Edit
                                            </button>

                                            <button
                                                className="delete-btn"
                                                onClick={() => handleDelete(g._id)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </>
    );
}
