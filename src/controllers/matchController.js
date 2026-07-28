import { Router } from "express";
import { isAuthenticated } from "../middlewares/authMiddleware.js";
import { getErrorMessage } from "../utils/errorUtil.js";
import { createMatchSchema } from "../schemas/matchSchema.js";
import { prepareStageOptions } from "../utils/prepareStageOptions.js";
import matchService from "../services/matchService.js";

const matchController = Router();

matchController.get("/create", isAuthenticated, (req, res) => {
    const stageOptions = prepareStageOptions();
    res.render("match/create", { stageOptions });
});

matchController.post("/create", isAuthenticated, async (req, res) => {
    const matchData = req.body;
    const ownerId = Number(req.user.id);

    try {
        const parsedData = await createMatchSchema.parseAsync(matchData);
        await matchService.create(parsedData, ownerId);
        
        res.redirect("match/dashboard");
    } catch (error) {
        const errorMessage = getErrorMessage(error);
        const stageOptions = prepareStageOptions(matchData);
        return res.status(400).render("match/create", { error: errorMessage, matchData, stageOptions });
    };
});

matchController.get("/dashboard", async (req, res) => {
    
    try {
        const matches = await matchService.getAll();
        
        res.render("match/dashboard", { matches });
    } catch (error) {
        const errorMessage = getErrorMessage(error);
        res.render("/", { error: errorMessage });
    }
})

export default matchController;