import express from "express";
import cookieParser from "cookie-parser";
import Router from "./routes/AuthRoutes.js";
import { connectDB } from "./config/db.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const homePath = path.join(__dirname, "static", "index.html");
export const signInPath = path.join(__dirname, "static", "signin.html");
export const signUpPath = path.join(__dirname, "static", "signup.html");
const app = express();
const PORT = 4000;
connectDB();
app.use(express.json());
app.use(cookieParser());
app.use("/", Router);
app.listen(PORT, () => {
    console.log(`server started successfully at http://localhost:${PORT}`);
})