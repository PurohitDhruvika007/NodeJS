import { signin, signup, homePage } from '../controllers/AuthControllers.js'
import express from "express";

const Router = express.Router();

Router.post("/signup", signup);
Router.post("/signin", signin);
Router.get("/home", homePage);

export default Router;