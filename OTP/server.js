import dotenv from "dotenv";
dotenv.config();
import express from "express";
import router from "./routes/OtpRoutes.js";


console.log(process.env.PASS, process.env.EMAIL)
const app = express();
app.use(express.json());

app.use("/", router);
app.listen(process.env.PORT || 4000, () => {
    console.log("server started successfully!");
})