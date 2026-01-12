import { Link, useNavigate } from "react-router-dom";
import api from "../../utils/api.js";
import { isLoggedIn, logoutUser } from "../../utils/auth.js";
import "./Navbar.css";

const Navbar = () => {
    const navigate = useNavigate();

    const logout = async () => {
        await api.post("/auth/logout");
        logoutUser();
        navigate("/login");
    };

    return (
        <header className="navbar">
            <div className="nav-container">
                <h1 className="logo">Blogify</h1>

                <nav className="nav-links">
                    <Link to="/">Home</Link>

                    {isLoggedIn() ? (
                        <>
                            <Link to="/create" className="create-btn">
                                Create
                            </Link>
                            <button onClick={logout} className="logout-btn">
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login">Login</Link>
                            <Link to="/register" className="register-btn">
                                Register
                            </Link>
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Navbar;
