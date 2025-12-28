import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import "./AddMovie.css";

export default function AddMovie() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [genre, setGenre] = useState("");
    const [year, setYear] = useState("");
    const [poster, setPoster] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async () => {
        const formdata = new FormData();
        formdata.append("title", title);
        formdata.append("description", description);
        formdata.append("genre", genre);
        formdata.append("released_year", year);
        formdata.append("poster", poster);

        await axios.post("http://localhost:4000/api/", formdata);
        alert("movie added successfully")
        navigate("/")
    }

    return (
        <div className="add-page">

            <div className="add-card">
                <h2>Add New Movie</h2>

                {/* Poster Preview */}
                <div className="poster-preview">
                    {poster ? (
                        <img src={URL.createObjectURL(poster)} alt="preview" />
                    ) : (
                        <span>Poster Preview</span>
                    )}
                </div>

                {/* Form */}
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
                    <label>Poster</label>
                    <input
                        type="file"
                        onChange={(e) => setPoster(e.target.files[0])}
                    />
                </div>

                <button className="submit-btn" onClick={handleSubmit}>
                    Add Movie
                </button>
            </div>

        </div>
    )
}
