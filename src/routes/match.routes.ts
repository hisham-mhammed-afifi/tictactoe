import express from "express";
import { MatchController } from "../controllers/match.controller";

const router = express.Router();

const controller = new MatchController();

router.post("/create", controller.create);
router.post("/join/:code", controller.join);

export default router;
