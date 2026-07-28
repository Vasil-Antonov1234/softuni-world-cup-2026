import { Router } from "express";

const matchController = Router();

matchController.get("/create", (req, res) => {
    res.render("match/create");
});

matchController.post("/create", async (req, res) => {
    const matchData = req.body;

    console.log(matchData)

    res.redirect("/");
})

export default matchController;