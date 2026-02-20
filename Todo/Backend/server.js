import express from "express";
import todoRouter from "./routes/todoRoutes.js";
import authRouter from "./routes/authRoutes.js";
import { connectDB } from "./config/db.js";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors(
    {
        origin: "http://localhost:5173",
        credentials: true
    }
));
app.use(cookieParser());
app.use("/api/auth", authRouter);
app.use("/api/todo", todoRouter);
connectDB();

app.listen(process.env.PORT, () => {
    console.log("server started successfully at 4000");
})