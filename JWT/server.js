import Router from './routes/AuthRoutes.js';
import express from "express";
import { connectDB } from './config/db.js';

const app = express();
const PORT = 4000;
app.use(express.json());
connectDB();
app.use("/", Router);
app.listen(PORT, () => {
    console.log(`server started successfully at http://localhost:${PORT}`);
})