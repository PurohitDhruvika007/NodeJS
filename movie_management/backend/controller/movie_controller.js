import { movie } from "../models/movie_model.js";
import fs from "fs";
import path from "path";
import { uploadPath } from "../middleware/upload.js";

export const addMovie = async (req, res) => {
    try {
        const { title, description, genre, released_year } = req.body;
        const new_movie = await movie.create({
            title: title,
            description: description,
            genre: genre,
            released_year: released_year,
            poster: req.file.filename
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
export const getMovieById = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await movie.findById(id);
        res.json(data);
    }
    catch (err) {
        res.json({ message: "movie by id not fetched", err })
    }
}
export const deleteMovie = async (req, res) => {
    try {
        const id = req.params.id;
        const movieId = await movie.findById(id);
        const deletePath = path.join(uploadPath, movieId.poster);
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

        if (!movieId) {
            return res.status(404).json({ message: "Movie not found" });
        }

        // 🔹 Update text fields
        movieId.title = req.body.title || movieId.title;
        movieId.description = req.body.description || movieId.description;
        movieId.genre = req.body.genre || movieId.genre;
        movieId.released_year = req.body.released_year || movieId.released_year;

        // 🔹 Update poster if new file uploaded
        if (req.file) {
            const oldPath = path.join(uploadPath, movieId.poster);

            if (fs.existsSync(oldPath)) {
                fs.unlinkSync(oldPath);
            }

            movieId.poster = req.file.filename;
        }

        await movieId.save();

        res.json({ message: "movie updated successfully", data: movieId });
    }
    catch (err) {
        res.status(500).json({ message: "movie not able to update", err });
    }
};
