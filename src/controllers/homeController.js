import { Router } from "express";
import matchService from "../services/matchService.js";
import { getErrorMessage } from "../utils/errorUtil.js";

const homeController = Router();

homeController.get("/", async (req, res) => {
    
    try {
        const lastThreeMatches = await matchService.getLastThree();

        res.render("home", { lastThreeMatches });
    } catch (error) {
        const errorMessage = getErrorMessage(error);
        res.status(404).render("404", { error: errorMessage });
    };

});

export default homeController;