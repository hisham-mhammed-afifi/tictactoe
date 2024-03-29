import "express-async-errors";
import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import connect from "./db/connect";
import swaggerUi from "swagger-ui-express";
import * as swaggerDocument from "../swagger.json";
import helmet from "helmet";
import cors from "cors";
import rateLimiter from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";
import { whiteList } from "./utils/helpers";

import UserRoutes from "./routes/user.routes";
import MatchRoutes from "./routes/match.routes";
import GameBoardRoutes from "./routes/gameBoard.routes";

dotenv.config();

const app: Application = express();

app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 60,
  })
);
app.use(helmet());
app.use(cors({ origin: whiteList(process.env.ORIGIN), credentials: true }));
app.use(mongoSanitize());

app.use(express.json());

app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, {
    customCssUrl:
      "https://cdn.jsdelivr.net/npm/swagger-ui@4.18.1/dist/swagger-ui.min.css",
  })
);

app.get("/", async (req: Request, res: Response): Promise<Response> => {
  return res.status(200).send("Hello, This is the Tic Tac Toe Game");
});

app.use("/users", UserRoutes);
app.use("/match", MatchRoutes);
app.use("/board", GameBoardRoutes);

connect(app);
