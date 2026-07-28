import { Router } from "express";
import matchService from "../services/matchService.js";

const apiController = Router();

apiController.get("/matches/top-scored", async (req, res) => {
    
    const topScoredMatches = await matchService.getTopScored();

    res.json(topScoredMatches);
})

export default apiController;