import express from "express";
import { UserController } from "../controllers/user.controller";
import { authenticate } from "../middlewares/authentication";

const router = express.Router();

const controller = new UserController();

router.get("/me", authenticate, controller.profile);
router.post("/signup", controller.signup);
router.post("/login", controller.login);

export default router;
