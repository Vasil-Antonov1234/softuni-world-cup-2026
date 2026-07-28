import { Router } from "express";

const matchController = Router();

matchController.get("/create", (req, res) => {
    res.render("match/create");
})

export default matchController;