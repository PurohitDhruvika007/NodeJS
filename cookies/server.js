import express from "express";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
app.use(cookieParser());
const PORT = 4000;
const user = {
    email: "admin@gmail.com",
    password: "admin123"
}

app.post("/signin", (req, res) => {
    const { email, password } = req.body;
    if (user.email == email && user.password == password) {
        res.cookie("auth", true, {
            maxAge: 1000 * 60,
            httpOnly: true,
            sameSite: "strict"
        });
        res.json({ message: "user sign in successfully" })
    }
    else {
        res.json({ message: "enter valid credential" });
    }
})
const isAuthenticated = (req, res, next) => {
    if (req.cookies.auth) {
        next();
    }
    else {
        res.json({ message: "first sign in to access home page" });
    }
}
app.get("/home", isAuthenticated, (req, res) => {
    res.json({ message: "welcome to home page" });
})

app.listen(PORT, () => {
    console.log(`server started successfully at http://localhost:${PORT}`);
})