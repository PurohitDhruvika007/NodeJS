import express from "express";
import { signIn, signUp, homePage, signInPage, signUpPage } from "../controllers/AuthController.js";
import { isAuthenticated } from "../middleware/AuthMiddleware.js";
const Router = express.Router();

Router.post("/api/signup", signUp);
Router.post("/api/signin", signIn);
Router.get("/home", isAuthenticated, homePage);
Router.get("/signin", signInPage);
Router.get("/signup", signUpPage);

export default Router;