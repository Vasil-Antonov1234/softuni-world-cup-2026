import { Router } from "express";
import { isAuthenticated } from "../middlewares/authMiddleware.js";
import { getErrorMessage } from "../utils/errorUtil.js";
import { createMatchSchema } from "../schemas/matchSchema.js";
import { prepareStageOptions } from "../utils/prepareStageOptions.js";
import matchService from "../services/matchService.js";

const matchController = Router();

matchController.get("/report", async (req, res) => {
    try {
        const matches = await matchService.getTopScored();

        res.render("match/report", { matches });
    } catch (error) {
        res.status(400).render("match/report", { apiError: true })
    }
    
})

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

        res.redirect("/matches/dashboard");
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
});

matchController.get("/:matchId/details", async (req, res) => {
    const matchId = Number(req.params.matchId);

    try {
        const match = await matchService.getById(matchId);

        if (!match) {
            return res.status(404).render("404", { error: "Match not found" })
        }

        const userId = req.user?.id;

        const isOwner = userId === match.ownerId;
        const hasLiked = match.likeBy.find((x) => x.id === userId);
        const likesCount = match.likeBy.length;

        res.render("match/details", { match, isOwner, hasLiked, likesCount });
    } catch (error) {
        const errorMessage = getErrorMessage(error);
        res.render("match/dashboard", { error: errorMessage });
    };
});

matchController.get("/:matchId/edit", isAuthenticated, async (req, res) => {
    const matchId = Number(req.params.matchId);
    const userId = Number(req.user.id);

    try {
        const match = await matchService.getById(matchId);
        const isOwner = match.ownerId === userId;

        if (!isOwner) {
            return res.status(403).render("404", { error: "Unauthorized" });
        }

        const stageOptions = prepareStageOptions(match);
        res.render("match/edit", { match, stageOptions });
    } catch (error) {
        const errorMessage = getErrorMessage(error);
        res.render("match/edit", { error: errorMessage })
    };
});

matchController.post("/:matchId/edit", isAuthenticated, async (req, res) => {
    const matchData = req.body;
    const matchId = Number(req.params.matchId);
    const userId = Number(req.user.id);

    try {
        const match = await matchService.getById(matchId);

        const isOwner = match.ownerId === userId;

        if (!isOwner) {
            return res.status(403).render("404", { error: "Unauthorized" });
        }

        const parsedMatchData = await createMatchSchema.parseAsync(matchData);

        await matchService.edit(parsedMatchData, matchId, userId);

        res.redirect(`/matches/${matchId}/details`);
    } catch (error) {
        const errorMessage = getErrorMessage(error);
        const stageOptions = prepareStageOptions(matchData);
        res.status(400).render("match/edit", { error: errorMessage, match: matchData, stageOptions })
    }
});

matchController.get("/:matchId/like", isAuthenticated, async (req, res) => {
    const matchId = Number(req.params.matchId);
    const userId = Number(req.user.id);

    try {
        await matchService.like(matchId, userId);

        res.redirect(`/matches/${matchId}/details`);
    } catch (error) {
        const errorMessage = getErrorMessage(error);
        return res.status(400).render("404", { error: errorMessage });
    };
});

matchController.get("/:matchId/delete", isAuthenticated, async (req, res) => {
    const matchId = Number(req.params.matchId);
    const userId = Number(req.user.id);

    try {
        const match = await matchService.remove(matchId, userId);

        res.status(204).redirect("/matches/dashboard")
    } catch (error) {
        const errorMessage = getErrorMessage(error);
        res.status(404).render("404", { error: errorMessage });
    };
})

export default matchController;