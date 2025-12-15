import express from "express";
import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, "data.json");
const PORT = 5000;

const ReadData = () => {
    const result = fs.readFileSync(filePath, "utf-8");
    let data = JSON.parse(result);
    return data;
}

const WriteData = (data) => {
    fs.writeFileSync(filePath, JSON.stringify(data));
}

app.get("/", (req, res) => {
    let data = ReadData();
    res.json(data)
})


app.post("/", (req, res) => {
    let data = ReadData();
    data.push(req.body);
    WriteData(data);
    res.json(data);
})

app.put("/:id", (req, res) => {
    let data = ReadData();
    let id = req.params.id;
    let index = data.findIndex((ele) => ele.id == id)
    if (index === -1) {
        return res.status(404).json({ message: "ID not found" });
    }
    data[index] = {
        ...data[index],
        ...req.body
    }

    WriteData(data);
    res.json(data);
})

app.delete("/:id", (req, res) => {
    let id = req.params.id;
    let data = ReadData();
    data = data.filter(ele => ele.id != id);
    WriteData(data);
    res.json(data);
})

app.listen(PORT, () => {
    console.log(`your server live on http://localhost:${PORT}`)
})