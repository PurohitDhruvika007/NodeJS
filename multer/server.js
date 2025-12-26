import express from "express";
import multer from "multer";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const app = express();
app.use(express.json());

const PORT = 4000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadPath = path.join(__dirname, "uploads");
app.use("/uploads", express.static(uploadPath));

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
        imageUrl: "/uploads/" + req.file.filename
    });

    const result = await student.save();
    res.json({ message: "data added!", result });
});

app.get("/", async (req, res) => {
    const data = await Student.find();
    res.json(data);
})

app.delete("/:id", async (req, res) => {
    const id = req.params.id;
    const students = await Student.findById(id);
    const deleteData = path.join(__dirname, students.imageUrl);
    if (fs.existsSync(deleteData)) {
        fs.unlinkSync(deleteData);
    }
    await Student.findByIdAndDelete(id)
    res.json({ message: "data deleted successfully" });
})

app.put("/:id", async (req, res) => {
    const id = req.params.id;
    const students = await Student.findById(id);
    const updatePath = path.join(__dirname, students.imageUrl);
    if (fs.existsSync(updatePath)) {
        fs.unlinkSync(updatePath)
        updatePath = req.file;
    }
    await Student.findByIdAndUpdate(id);
    res.json({ message: "data updated successfully" });
})

app.listen(PORT, () => {
    console.log(`server started successfully at http://localhost:${PORT}`);
})