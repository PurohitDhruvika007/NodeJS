import http from 'http';
import fs from 'fs';

const PORT = 4200;

const server = http.createServer((req, res) => {

    const date = new Date();
    const data = `request sent on http://localhost:${req.url} by ${req.method} at ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} | ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} at ip address ${req.socket.remoteAddress || 'N/A'}\n`;

    fs.appendFileSync("log_details.txt", data)
    if (req.url === "/" && req.method === "GET") {
        res.writeHead(200, { "content-type": "text/plain" })
        res.end("Home page - GET method");
    } else if (req.url === "/" && req.method === "POST") {
        res.writeHead(200, { "content-type": "text/plain" })
        res.end("Home page - POST method");
    } else if (req.url === "/" && req.method === "PUT") {
        res.writeHead(200, { "content-type": "text/plain" })
        res.end("Home page - PUT method");
    } else if (req.url === "/" && req.method === "DELETE") {
        res.writeHead(200, { "content-type": "text/plain" })
        res.end("Home page - DELETE method");
    } else {
        res.writeHead(404, { "content-type": "text/plain" })
        res.end("404 page not loaded");
    }
})

server.listen(PORT, () => {
    console.log(`server live on http://localhost:${PORT} `)
})