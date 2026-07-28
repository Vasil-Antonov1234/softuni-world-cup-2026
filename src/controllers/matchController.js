import { Router } from "express";
import { isAuthenticated } from "../middlewares/authMiddleware.js";
import { getErrorMessage } from "../utils/errorUtil.js";
import { createMatchSchema } from "../schemas/matchSchema.js";
import { prepareStageOptions } from "../utils/prepareStageOptions.js";

const matchController = Router();

matchController.get("/create", isAuthenticated, (req, res) => {
    const stageOptions = prepareStageOptions();
    res.render("match/create", { stageOptions });
});

matchController.post("/create", isAuthenticated, async (req, res) => {
    const matchData = req.body;

    try {
        const parsedData = await createMatchSchema.parseAsync(matchData);
        
        res.redirect("match/dashboard");
    } catch (error) {
        const errorMessage = getErrorMessage(error);
        const stageOptions = prepareStageOptions(matchData);

        // console.log(stageOptions)
        return res.status(400).render("match/create", { error: errorMessage, matchData, stageOptions });
    };
})

export default matchController;