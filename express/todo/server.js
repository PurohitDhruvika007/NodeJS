import http from 'http';
import { fileURLToPath } from 'url';
import express from 'express';
import path from 'path';
import fs from "fs"

const server = express();
server.use(express.json());
const PORT = 4000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, "todo.json");

const readData = () => {
    const data = fs.readFileSync(filePath, "utf-8")
    return JSON.parse(data)
}
const writeData = (todos) => {
    fs.writeFileSync(filePath, JSON.stringify(todos));
}

server.get("/", (req, res) => {
    let todos = readData();

    const { status, search, dueDate } = req.query;

    if (status) {
        todos = todos.filter(todo =>
            todo.status.toLowerCase() === status.toLowerCase()
        );
    }

    if (search) {
        todos = todos.filter(todo =>
            todo.title.toLowerCase().includes(search.toLowerCase())
        );
    }

    if (dueDate) {
        todos = todos.filter(todo =>
            todo.dueDate === dueDate
        );
    }

    res.json(todos);
});


server.get("/:id", (req, res) => {
    const id = req.params.id;
    let todos = readData();

    todos = todos.filter((todo) => todo.id == id);

    res.json(todos);
});

server.post("/", (req, res) => {
    let todos = readData();
    todos.push(req.body);
    writeData(todos);
    res.json(todos);
})

server.delete("/:id", (req, res) => {
    let todos = readData();
    const id = req.params.id;
    todos = todos.filter((todo) => todo.id != id)
    writeData(todos);
    res.json(todos);
})

server.put("/:id", (req, res) => {
    let todos = readData();
    const id = req.params.id;

    // find index of todo
    const index = todos.findIndex(todo => todo.id == id);

    if (index === -1) {
        return res.status(404).json({ message: "Todo not found" });
    }

    // merge old + new data
    todos[index] = {
        ...todos[index],  // old data
        ...req.body       // new data (title, status, dueDate, etc.)
    };

    writeData(todos);

    res.json(todos);
});


server.listen(PORT, () => {
    console.log(`server started successfully on http://localhost:${PORT}`);
})