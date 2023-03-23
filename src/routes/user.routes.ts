import express from "express";
import { UserController } from "../controllers/user.controller";

const router = express.Router();

const controller = new UserController();

router.post("/signup", controller.signup);
router.post("/login", controller.login);

export default router;
