import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Base_user_url } from '../utils/globalVariable'
import Signin from "../pages/Signin/Signin.jsx"

export default function CheckLogin({ children }) {
    const [isLogin, setIsLogin] = useState(false);
    const getCurrentUser = async () => {
        try {
            const res = await axios.get(`${Base_user_url}/getUser`, { withCredentials: true });
            if (res.data.user.role == "admin") {
                setIsLogin(true);
            }
            else {
                setIsLogin(false);
            }
        }
        catch (err) {
            setIsLogin(false);
        }
    }
    useEffect(() => {
        getCurrentUser();
    }, [])
    return (
        (isLogin) ? children : <Signin />
    )
}
