import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router';

export default function UpdateMovie() {
    const navigate = useNavigate();
    const location = useLocation();
    const movie = location.state;
    const [title, setTitle] = useState(movie?.title || "");
    const [description, setDescription] = useState(movie?.description || "");
    const [genre, setGenre] = useState(movie?.genre || "");
    const [year, setYear] = useState(movie?.released_year || "");
    const [poster, setPoster] = useState(null);           // new file
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
        <div>
            <h1>update movie</h1>
            <img
                src={
                    poster instanceof File
                        ? URL.createObjectURL(poster)          // new file preview
                        : currentPoster                         // existing image
                            ? "http://localhost:4000/uploads/" + currentPoster
                            : null
                }
                alt="poster"
                width="150"
            />
            <div>
                <input type="text" placeholder="enter the title.." value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div>
                <input type="text" placeholder='enter the genre' value={genre} onChange={(e) => setGenre(e.target.value)} />
            </div>
            <div>
                <input type="text" placeholder='enter the released year' value={year} onChange={(e) => setYear(e.target.value)} />
            </div>
            <div>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder='enter the description'></textarea>
            </div>
            <div>
                <input type="file" onChange={(e) => setPoster(e.target.files[0])} />
            </div>
            <div>
                <button onClick={handleUpdate}>Update movie</button>
            </div>
        </div>
    )
}
