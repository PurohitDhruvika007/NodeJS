import React from "react";
import { Link } from "react-router";
import "./Navbar.css";

export default function () {
    return (
        <header className="navbar">
            <div className="logo">MovieManager</div>

            <nav className="nav-links">
                <Link to="/" className="link">Movies</Link>
                <Link to="/add" className="add-btn">Add Movie</Link>
            </nav>
        </header>
    );
}
