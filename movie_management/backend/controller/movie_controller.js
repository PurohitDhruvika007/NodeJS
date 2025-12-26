import { movie } from "../models/movie_model.js";
import fs from "fs";
import path from "path";
import { __dirname } from "../middleware/upload.js";

export const addMovie = async (req, res) => {
    try {
        const { title, description, genre, released_year } = req.body;
        const new_movie = await movie.create({
            title: title,
            description: description,
            genre: genre,
            released_year: released_year,
            poster: "uploads/" + req.file.filename
        });
        res.json({ message: "movie added successfully", data: new_movie });
    }
    catch (err) {
        res.json({ message: "data not inserted ", err })
    }
}

export const getMovie = async (req, res) => {
    try {
        const data = await movie.find();
        res.json(data);
    }
    catch (err) {
        res.json({ message: "data not fetched!", err })
    }
}
export const deleteMovie = async (req, res) => {
    try {
        const id = req.params.id;
        const movieId = await movie.findById(id);
        const deletePath = path.join(__dirname, movieId.poster);
        if (fs.existsSync(deletePath)) {
            fs.unlinkSync(deletePath)
        }
        await movie.findByIdAndDelete(id);
        res.json({ message: "movie deleted successfully!" })
    }
    catch (err) {
        res.json({ message: "movie not able to delete", err });
    }
}

export const updateMovie = async (req, res) => {
    try {
        const id = req.params.id;
        const movieId = await movie.findById(id);
        const updatePath = path.join(__dirname, movieId.poster)
        if (fs.existsSync(updatePath)) {
            fs.unlinkSync(updatePath);
            movieId.poster = "/uploads/" + req.file.filename;
        }
        await movieId.save();
        res.json({ message: "movie updated successfully" });
    }
    catch (err) {
        res.json({ message: "movie not able to update", err })
    }
}