import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    genre: { type: String, required: true },
    released_year: { type: String, required: true },
    poster: { type: String, required: true }
}, { timestamps: true });

export const movie = mongoose.model("movies", movieSchema);