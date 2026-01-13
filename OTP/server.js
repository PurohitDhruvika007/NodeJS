// import dotenv from "dotenv";
// dotenv.config();
// import express from "express";
// import router from "./routes/OtpRoutes.js";

// const app = express();
// app.use(express.json());

// app.use("/", router);
// app.listen(process.env.PORT || 4000, () => {
//     console.log("server started successfully!");
// })

import express from "express";
import dotenv from "dotenv";
import router from "./routes/OtpRoutes.js";
import { ConnectDB } from "./config/db.js";

dotenv.config();
ConnectDB();

const app = express();
app.use(express.json());

app.use("/", router);

app.listen(process.env.PORT || 4000, () => {
    console.log(`Server running on port ${process.env.PORT || 4000}`);
});
