import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router";
import './Login.css';

export default function Login() {
    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(
                "http://localhost:4000/api/auth/signin",
                form,
                { withCredentials: true }
            );

            alert(res.data.message);

            if (res.data.status) {
                navigate("/"); // redirect on successful login
            }
        } catch (err) {
            alert(err.response?.data?.message || "Something went wrong!");
        }
    };

    return (
        <div className="login-wrapper">
            <div className="login-card">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                        required
                    />
                    <button type="submit">Login</button>
                </form>
                <p>
                    Don't have an account? <Link to="/register">Register</Link>
                </p>
            </div>
        </div>
    );
}