import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router";
import "./Register.css"; // import CSS

export default function Register() {
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await axios.post("http://localhost:4000/api/auth/signup", form);
        alert(res.data.message);
        if (res.data.status) navigate("/login");
    };

    return (
        <div className="register-wrapper">
            <div className="register-card">
                <h2>Create Your Account</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Full Name"
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                    />
                    <button type="submit">Get Started</button>
                </form>
                <p>
                    Already have an account? <Link to="/login">Log In</Link>
                </p>
            </div>
        </div>
    );
}