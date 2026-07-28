import { Router } from "express";
import homeController from "./controllers/homeController.js";
import authController from "./controllers/authController.js";
import matchController from "./controllers/matchController.js";
import apiController from "./controllers/apiController.js";

const routes = Router();

routes.use("/", homeController);
routes.use("/auth", authController);
routes.use("/matches", matchController);

// API routes
routes.use("/api", apiController);

export default routes;