import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export default function MovieList() {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();
    let filtering = [...data];

    if (search) {
        filtering = filtering.filter((ele) => ele.title.toLowerCase().includes(search.toLowerCase()))
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
        <div>
            <h1>MovieList</h1>
            <div>
                <input type="text" placeholder="search the title.." value={search} onChange={(e) => setSearch(e.target.value)} />
                <button onClick={() => { navigate("/add") }}>Add movie</button>
            </div>
            {filtering.map((ele) => (
                <div key={ele._id}>
                    <img src={"http://localhost:4000/uploads/" + ele.poster} alt="ing not load" />
                    <h3>{ele.title}</h3>
                    <h5>{ele.description}</h5>
                    <button onClick={() => { navigate("/detail", { state: ele }) }}>view more</button>
                </div>
            ))}
        </div>
    );
}
