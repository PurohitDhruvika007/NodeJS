import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import "./MovieList.css";

export default function MovieList() {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();
    let filtering = [...data];

    if (search) {
        filtering = filtering.filter((ele) =>
            ele.title.toLowerCase().includes(search.toLowerCase())
        );
    }

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const res = await axios.get("http://localhost:4000/api/");
                setData(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchMovies();
    }, []);

    return (
        <div className="page">

            {/* Search */}
            <div className="search-box">
                <input
                    type="text"
                    placeholder="Search movies by title"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {/* Movie List */}
            <div className="movie-grid">
                {filtering.map((ele) => (
                    <div className="movie-card" key={ele._id}>
                        <img
                            src={"http://localhost:4000/uploads/" + ele.poster}
                            alt="poster"
                        />

                        <div className="movie-info">
                            <h3>{ele.title}</h3>
                            <p>{ele.description}</p>

                            <button
                                onClick={() => navigate("/detail", { state: ele })}
                            >
                                View Details
                            </button>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}
