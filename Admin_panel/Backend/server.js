import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import router from "./routes/authRoutes.js";
import { ConnectDB } from "./config/db.js";
import cors from "cors";

dotenv.config();
const app = express();
app.use(cors(
    {
        origin: "http://localhost:5173",
        credentials: true
    }
));
app.use(cookieParser());
app.use(express.json());
app.use("/api/auth/", router);
ConnectDB();
app.listen(process.env.PORT, () => {
    console.log("server started successfully");
})