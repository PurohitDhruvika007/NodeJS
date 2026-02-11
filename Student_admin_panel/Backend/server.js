import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { ConnectDB } from "./config/db.js";

import authRoutes from "./routes/auth_routes.js";
import adminRoutes from "./routes/admin_routes.js";
import studentRoutes from "./routes/student_routes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/student", studentRoutes);

ConnectDB();

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
