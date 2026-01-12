import { useState } from "react";
import api from "../../utils/api.js";
import { useNavigate } from "react-router-dom";
import "./Register.css";

const Register = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    });
    const navigate = useNavigate();

    const submit = async (e) => {
        e.preventDefault();
        await api.post("/auth/register", form);
        await api.post("/auth/send-otp", { email: form.email });
        navigate("/verify-otp");
    };

    return (
        <div className="register-wrapper">
            <div className="register-card">
                <h1>Create Account 🚀</h1>
                <p>Join us and start blogging</p>

                <form onSubmit={submit}>
                    <label>Name</label>
                    <input
                        type="text"
                        placeholder="Enter your name"
                        value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                        required
                    />

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
                        placeholder="Create a password"
                        value={form.password}
                        onChange={e => setForm({ ...form, password: e.target.value })}
                        required
                    />

                    <button type="submit">Register</button>
                </form>
            </div>
        </div>
    );
};

export default Register;
