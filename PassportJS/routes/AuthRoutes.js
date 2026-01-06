import { signin, signout, signup, homepage } from "../controllers/AuthControllers.js";
import express from "express";
import passport from "passport";
import { isAuthenticated } from "../middleware/AuthMiddleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", passport.authenticate("local"), signin);
router.get("/home", isAuthenticated, homepage);
router.get("/", (req, res) => {
    res.json({ message: "default route called" })
})

export default router;