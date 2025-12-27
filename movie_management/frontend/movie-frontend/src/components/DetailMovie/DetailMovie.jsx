import axios from 'axios';
import React from 'react'
import { useNavigate } from 'react-router';
import { useLocation } from 'react-router'

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
        <div>
            <h1>detail movie</h1>
            <img src={"http://localhost:4000/uploads/" + movie.poster} alt="" />
            <h4>{movie.title}</h4>
            <h4>{movie.description}</h4>
            <h4>{movie.genre}</h4>
            <h4>{movie.released_year}</h4>
            <button onClick={handleUpdate}>update</button>
            <button onClick={handleDelete}>delete</button>
        </div>
    )
}
