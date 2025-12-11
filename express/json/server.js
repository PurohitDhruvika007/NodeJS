import http from 'http'
import express from 'express'
import fs from 'fs'
import url from 'url'
import { fileURLToPath } from 'url'
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)
const filePath = path.join(__dirname, "db.json");

const server = express()

const PORT = 4000;

server.use(express.json())

const readData = () => {
    let data = fs.readFileSync(filePath, "utf8")
    return JSON.parse(data);
}
const writeData = (users) => {
    fs.writeFileSync(filePath, JSON.stringify(users))
}

// use to read data 
server.get("/", (req, res) => {
    let data = readData();
    res.json(data)
})

server.get("/:id", (req, res) => {
    let data = readData();
    let id = req.params.id;
    data = data.filter((d) => d.id == id)
    res.json(data)
})

// use to add data 

server.post("/", (req, res) => {
    const users = readData();
    users.push(req.body)
    writeData(users);
    res.json(users);
})

server.delete("/:id", (req, res) => {
    let data = readData();
    let id = req.params.id;
    data = data.filter((ele) => ele.id != id);
    writeData(data);
    res.json(data);
})

server.put(":/id", (req, res) => {
    let id = req.params.id;
    let data = readData();

    let index = data.find((ele) => ele.id == id)
    data[index] = {
        ...data[index],
        ...req.body
    }
    writeData(data)
    res.json(data)
})


server.listen(PORT, () => {
    console.log(`server connected successfully on http://localhost:${PORT} `)
})