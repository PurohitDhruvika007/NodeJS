import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/AuthRoutes.js";
import blogRoutes from "./routes/BlogRoutes.js";
import dotenv from "dotenv";
import { ConnectDB } from "./config/db.js";

dotenv.config();

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

ConnectDB();

app.use("/uploads", express.static("uploads"));

app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);

app.listen(4000, () => {
    console.log(`server connected successfully at http://localhost:${process.env.PORT}`);
});
