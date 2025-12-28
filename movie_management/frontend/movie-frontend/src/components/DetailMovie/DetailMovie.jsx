import axios from 'axios';
import React from 'react'
import { useNavigate, useLocation } from 'react-router'
import "./DetailMovie.css";

export default function DetailMovie() {
    const location = useLocation();
    const movie = location.state;
    const navigate = useNavigate();

    const handleUpdate = () => {
        navigate("/detail/update", { state: movie })
    }

    const handleDelete = async () => {
        await axios.delete(`http://localhost:4000/api/${movie._id}`);
        alert("movie deleted successfully");
        navigate("/");
    }

    return (
        <div className='main'>
            <div className="detail-page">

                <div className="detail-card">

                    {/* Large Poster */}
                    <div className="detail-poster">
                        <img
                            src={"http://localhost:4000/uploads/" + movie.poster}
                            alt="poster"
                        />
                    </div>

                    {/* Content */}
                    <div className="detail-info">

                        {/* Header with small image */}
                        <div className="detail-header">
                            <img
                                src={"http://localhost:4000/uploads/" + movie.poster}
                                alt="thumb"
                                className="detail-thumb"
                            />

                            <div>
                                <h2>{movie.title}</h2>
                                <p className="detail-sub">
                                    {movie.genre} • {movie.released_year}
                                </p>
                            </div>
                        </div>

                        {/* Description Box */}
                        <div className="detail-box">
                            <h4>Description</h4>
                            <p>{movie.description}</p>
                        </div>

                        {/* Action Buttons */}
                        <div className="detail-actions">
                            <button className="edit-btn" onClick={handleUpdate}>
                                Update
                            </button>
                            <button className="delete-btn" onClick={handleDelete}>
                                Delete
                            </button>
                        </div>

                    </div>

                </div>

            </div>
        </div>
    )
}
