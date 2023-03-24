import express from "express";
import { GameBoardController } from "../controllers/gameBoard.controller";
import { authenticate } from "../middlewares/authentication";

const router = express.Router();

const controller = new GameBoardController();

router.post("/create", authenticate, controller.create);
router.put("/move/:id", authenticate, controller.move);

export default router;
