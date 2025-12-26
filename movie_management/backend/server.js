import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import router from "./routes/movie_routes.js";
import { logger } from "./middleware/logger.js";

const app = express();
const PORT = 4000;

app.use(express.json());
app.use(cors());
app.use(logger);
app.use("/uploads", express.static("uploads"));
app.use("/", router);

connectDB();

app.listen(PORT, () => {
    console.log(`server started at http://localhost:${PORT}`);
});
