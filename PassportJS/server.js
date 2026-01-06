import express from "express";
import router from "./routes/AuthRoutes.js";
import './config/passport.js';
import { connectDB } from "./config/db.js";
import cookieParser from "cookie-parser";
import mongo from "connect-mongo";
import session from "express-session";
import passport from "passport";

const app = express();
const PORT = 4000;
app.use(express.json());
app.use(cookieParser());
connectDB();

app.use(session({
    secret: "secret-abc-123",
    resave: false,
    saveUninitialized: false,
    store: mongo.create({ mongoUrl: "mongodb://localhost:27017/passport" }),
    cookie: {
        maxAge: 1000 * 60 * 60
    }
}));
app.use(passport.initialize());
app.use(passport.session());

app.use("/", router);
app.listen(PORT, () => { console.log(`server started successfully at http://localhost:${PORT}`) })
