import express from 'express'

const app = express();

let checkUser = (req, res, next) => {
    if (req.query.role == "admin") {
        next();
    }
    else {
        res.status(401).json({ message: "data not available" });
    }
}

app.get("/", checkUser, (req, res) => {
    res.json({
        role: req.query.role,
        url: req.url,
        method: req.method,
        msg: "hello server"
    })
})

app.listen(3000, () => {
    console.log("server connected successfully on http://localhost:3000 ");
})