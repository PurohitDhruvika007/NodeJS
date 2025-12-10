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
    return data;
}

// use to read data 
server.get("/", (req, res) => {
    let data = readData();
    res.json(JSON.parse(data))
})

// use to add data 

server.post("/", (req, res) => {
    const users = readData();
    users.push(req.body)
    fs.writeFileSync(filePath, JSON.stringify(users))

})

server.listen(PORT, () => {
    console.log(`server connected successfully on http://localhost:${PORT} `)
})