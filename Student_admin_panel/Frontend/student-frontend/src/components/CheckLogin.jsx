import React, { useEffect, useState } from "react";
import { Navigate } from "react-router";
import axios from "axios";
import { Base_auth_url } from "../utils/global_variable";

export default function CheckLogin({ children, allowedRole }) {
    const [loading, setLoading] = useState(true);
    const [role, setRole] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const checkLogin = async () => {
            try {
                // ✅ Use cookie automatically with withCredentials
                const res = await axios.get(`${Base_auth_url}check-login`, {
                    withCredentials: true
                });

                setRole(res.data.role); // role returned from backend
                setIsLoggedIn(true);
            } catch (err) {
                setIsLoggedIn(false);
            } finally {
                setLoading(false);
            }
        };

        checkLogin();
    }, []);

    if (loading) {
        return <div>Loading...</div>; // or a spinner
    }

    if (!isLoggedIn) {
        return <Navigate to="/signin" replace />;
    }

    if (allowedRole && role !== allowedRole) {
        return <Navigate to="/" replace />;
    }

    return children;
}
