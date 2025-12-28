import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router';
import "./UpdateMovie.css";

export default function UpdateMovie() {
    const navigate = useNavigate();
    const location = useLocation();
    const movie = location.state;

    const [title, setTitle] = useState(movie?.title || "");
    const [description, setDescription] = useState(movie?.description || "");
    const [genre, setGenre] = useState(movie?.genre || "");
    const [year, setYear] = useState(movie?.released_year || "");
    const [poster, setPoster] = useState(null);
    const [currentPoster, setCurrentPoster] = useState(movie?.poster || "");

    const handleUpdate = async () => {
        const formdata = new FormData();
        formdata.append("title", title);
        formdata.append("description", description);
        formdata.append("genre", genre);
        formdata.append("released_year", year);
        formdata.append("poster", poster);

        axios.put(`http://localhost:4000/api/${movie._id}`, formdata);
        alert("movie updated successfully!");
        navigate("/");
    }

    return (
        <div className="add-page">

            <div className="add-card">
                <h2>Update Movie</h2>

                {/* Poster Preview */}
                <div className="poster-preview">
                    {(poster || currentPoster) ? (
                        <img
                            src={
                                poster instanceof File
                                    ? URL.createObjectURL(poster)
                                    : "http://localhost:4000/uploads/" + currentPoster
                            }
                            alt="poster"
                        />
                    ) : (
                        <span>Poster Preview</span>
                    )}
                </div>

                <div className="form-group">
                    <label>Title</label>
                    <input
                        type="text"
                        placeholder="Enter movie title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label>Genre</label>
                    <input
                        type="text"
                        placeholder="Enter genre"
                        value={genre}
                        onChange={(e) => setGenre(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label>Release Year</label>
                    <input
                        type="text"
                        placeholder="Enter release year"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label>Description</label>
                    <textarea
                        placeholder="Enter description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label>Change Poster</label>
                    <input
                        type="file"
                        onChange={(e) => setPoster(e.target.files[0])}
                    />
                </div>

                <button className="submit-btn" onClick={handleUpdate}>
                    Update Movie
                </button>
            </div>

        </div>
    )
}
