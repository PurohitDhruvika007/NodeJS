
import router from "./routes/bookRoutes.js";
import { logger } from "./middleware/logger.js";
import express from "express";
import { connectDB } from './config/db.js'

const app = express();
const PORT = 4000;
app.use(express.json());
app.use(logger);
connectDB();
app.use("/api", router);

app.listen(PORT, () => {
    console.log(`server started successfully on http://localhost:${PORT}`);
})
