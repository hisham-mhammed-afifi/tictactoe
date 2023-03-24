import { Request, Response } from "express";
import { NotFoundError } from "../errors";
import Match from "../models/Match";

export class MatchController {
  constructor() {}

  async create(req: Request, res: Response): Promise<Response> {
    const { firstPlayerId } = req.body;

    const code = Math.floor(Math.random() * 100000).toString();

    const match = await Match.create({
      firstPlayerId,
      joinCode: code,
    });

    return res.status(201).json(true);
  }

  async join(req: Request, res: Response): Promise<Response> {
    const { secondPlayerId } = req.body;

    const match = await Match.findOneAndUpdate(
      { joinCode: req.params.code },
      { secondPlayerId },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!match) {
      throw new NotFoundError("Not Found");
    }

    return res.status(200).json({ match });
  }
}
