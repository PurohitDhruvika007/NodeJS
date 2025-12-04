import http from 'http';
const PORT = 3665;

import fs from "fs";
const data = fs.readFileSync("index.html", "utf8");

const server = http.createServer((req, res) => {
    if (req.url === "/") {
        res.writeHead(200, { "content-type": "text/plain" });
        res.end("this is home page");
    } else if (req.url === "/about") {
        res.writeHead(200, { "content-type": "text/plain" });
        res.end("this is about page");
    } else if (req.url === "/contact") {
        res.writeHead(200, { "content-type": "text/plain" });
        res.end("this is contact page");
    } else if (req.url === "/service") {
        res.writeHead(200, { "content-type": "text/html" });
        res.end(data);
    } else {
        res.writeHead(404, { "content-type": "text/plain" });
        res.end("404 page not found");
    }
})
server.listen(PORT, () => {
    console.log(`server connected at http://localhost:${PORT}/`);
})