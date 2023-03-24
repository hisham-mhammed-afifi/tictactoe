import express from "express";
import { MatchController } from "../controllers/match.controller";
import { authenticate } from "../middlewares/authentication";

const router = express.Router();

const controller = new MatchController();

router.post("/create", authenticate, controller.create);
router.post("/join/:code", authenticate, controller.join);

export default router;
