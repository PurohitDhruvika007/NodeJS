import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router";

export default function Register() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    });

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await axios.post(
            "http://localhost:4000/api/auth/signup",
            form
        );

        alert(res.data.message);

        if (res.data.status) {
            navigate("/login");
        }
    };

    return (
        <div>
            <h2>Register</h2>

            <form onSubmit={handleSubmit}>
                <input
                    placeholder="Name"
                    onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                    }
                />

                <input
                    placeholder="Email"
                    onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                    }
                />

                <input
                    type="password"
                    placeholder="Password"
                    onChange={(e) =>
                        setForm({ ...form, password: e.target.value })
                    }
                />

                <button type="submit">Register</button>
            </form>

            <p>
                Already registered?{" "}
                <Link to="/login">Login</Link>
            </p>
        </div>
    );
}