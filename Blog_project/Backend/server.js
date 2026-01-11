import express from "express";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/AuthRoutes.js";
import blogRoutes from "./routes/BlogRoutes.js";
import dotenv from "dotenv";
import { ConnectDB } from "./config/db.js";
dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());
ConnectDB();
app.use("/uploads", express.static("uploads"));

app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);

app.listen(process.env.PORT, () => {
    console.log(`server connected successfully at http://localhost:${process.env.PORT}`);
})
