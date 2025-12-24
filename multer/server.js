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

mongoose.connect("mongodb://127.0.0.1:27017/school")
    .then(() => console.log("data connected successfully"))
    .catch((err) => console.log(err));


const studentSchema = new mongoose.Schema({
    name: String,
    age: Number,
    course: String,
    imageUrl: String
}, { timestamps: true });

const Student = mongoose.model("students", studentSchema);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({ storage });



app.post("/", upload.single("image"), async (req, res) => {
    const student = new Student({
        name: "priti chawla",
        age: 19,
        course: "B.C.A (AI)",
        imageUrl: req.file.filename
    });

    const result = await student.save();
    res.json({ message: "data added!", result });
});


app.listen(PORT, () => {
    console.log(`server started successfully at http://localhost:${PORT}`);
})