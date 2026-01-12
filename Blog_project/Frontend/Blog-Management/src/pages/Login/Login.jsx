import { useState } from "react";
import api from "../../utils/api.js";
import { saveUser } from "../../utils/auth.js";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const submit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const res = await api.post("/auth/login", form);

            if (res.data.message === "Login successful") {
                saveUser({ email: form.email });
                navigate("/");
            } else {
                setError(res.data.message || "Login failed");
            }
        } catch (err) {
            setError(err.response?.data?.message || "Server error");
        }
    };

    return (
        <div className="login-wrapper">
            <div className="login-card">
                <h1>Welcome Back 👋</h1>
                <p>Please login to your account</p>

                <form onSubmit={submit}>
                    <label>Email</label>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={form.email}
                        onChange={e => setForm({ ...form, email: e.target.value })}
                        required
                    />

                    <label>Password</label>
                    <input
                        type="password"
                        placeholder="Enter your password"
                        value={form.password}
                        onChange={e => setForm({ ...form, password: e.target.value })}
                        required
                    />

                    {error && <p className="error-msg">{error}</p>}

                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
