import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { ConnectDB } from "./config/db.js";

import authRoutes from "./routes/auth_routes.js";
import adminRoutes from "./routes/admin_routes.js";
import studentRoutes from "./routes/student_routes.js";

dotenv.config();
const app = express();

// Middleware
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173", // Frontend URL
    credentials: true, // Allow cookies
}));
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/student", studentRoutes);

// Connect Database
ConnectDB();

// Start Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
