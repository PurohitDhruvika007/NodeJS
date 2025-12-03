import http from "http";
import fs from "fs";
const server = http.createServer((req, res) => {
    res.writeHead(200, { "content-type": "text/plain" });
    const date = new Date();
    const time = date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    fs.appendFileSync("request.txt", "\nrequest send on server on " + time)
    res.end("successfully conected!!");
})

server.listen(3500, () => {
    console.log("server running on http://localhost:3500 ");
})