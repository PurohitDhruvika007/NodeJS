import express from "express";
import multer from "multer";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
app.use(express.json());
const PORT = 4000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadPath = path.join(__dirname, "uploads");

mongoose.connect("mongodb://127.0.0.1:27017/image")
    .then(() => console.log("data connected successfully"))
    .catch((err) => console.log(err));

app.post("/", () => {

})

app.listen(PORT, () => {
    console.log(`server started successfully at http://localhost:${PORT}`);
})