import React, { useEffect, useState } from "react";
import axios from "axios";
import Admin_navbar from "../../components/Admin_navbar/Admin_navbar";
import "./Admin_dashboard.css";
import { Base_admin_url } from "../../utils/global_variable";

export default function Admin_dashboard() {

    const [data, setData] = useState({
        totalStudents: 0,
        totalAdmins: 0,
        totalGrades: 0,
        totalAttendance: 0
    });

    useEffect(() => {
        fetchDashboard();
    }, []);

    const fetchDashboard = async () => {
        try {
            const token = localStorage.getItem("token");

            const res = await axios.get(
                `${Base_admin_url}dashboard`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setData(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <Admin_navbar />

            <div className="dashboard-container">
                <h1 className="dashboard-title">Admin Dashboard</h1>

                <div className="card-container">

                    <div className="dashboard-card">
                        <h3>Total Students</h3>
                        <p>{data.totalStudents}</p>
                    </div>

                    <div className="dashboard-card">
                        <h3>Total Admins</h3>
                        <p>{data.totalAdmins}</p>
                    </div>

                    <div className="dashboard-card">
                        <h3>Total Grades</h3>
                        <p>{data.totalGrades}</p>
                    </div>

                    <div className="dashboard-card">
                        <h3>Total Attendance</h3>
                        <p>{data.totalAttendance}</p>
                    </div>

                </div>
            </div>
        </>
    );
}
