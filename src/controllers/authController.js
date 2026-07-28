import { Router } from "express";
import { createUserSchema } from "../schemas/authSchema.js";
import { getErrorMessage } from "../utils/errorUtil.js";
import authService from "../services/authService";
import { generateAccessToken } from "../utils/accessTokenUtil.js";
import { isAuthenticated, isGuest } from "../middlewares/authMiddleware.js";

const authController = Router();

authController.get("/register", isGuest, async (req, res) => {
    res.render("auth/register");
});

authController.post("/register", isGuest, async (req, res) => {
    const userData = req.body;

    try {
        const parsedUserData = await createUserSchema.parseAsync(userData);
        const user = await authService.register(parsedUserData);
        const token = generateAccessToken(user);

        res.cookie("auth", token, { httpOnly: true });
        res.redirect("/");
    } catch (error) {
        const errorMessage = getErrorMessage(error)
        res.status(400).render("auth/register", { error: errorMessage, userData });
    };
});

authController.get("/login", isGuest, async (req, res) => {
    res.render("auth/login");
});

authController.post("/login", isGuest, async (req, res) => {
    const userData = req.body;

    try {
        const user = await authService.login(userData);
        const token = generateAccessToken(user);

        res.cookie("auth", token, { httpOnly: true }).redirect("/");
    } catch (error) {        
        const errorMessage = getErrorMessage(error)
        res.status(400).render("auth/login", { error: errorMessage, userData });
    };
});

authController.get("/logout", isAuthenticated, (req, res) => {
    res.clearCookie("auth").redirect("/");
})

export default authController;