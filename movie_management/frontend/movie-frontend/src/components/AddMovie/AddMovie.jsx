import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router';

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
        <div>
            <h1>add movie</h1>
            <img src={poster ? URL.createObjectURL(poster) : ""} alt="" />
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
                <button onClick={handleSubmit}>Add movie</button>
            </div>
        </div>
    )
}
