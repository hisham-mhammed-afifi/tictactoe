import { Request, Response } from "express";
import { BadRequestError, NotFoundError } from "../errors";
import GameBoard from "../models/GameBoard";

export class GameBoardController {
  constructor() {}

  async create(req: Request, res: Response): Promise<Response> {
    const { matchId, currentPlayerId } = req.body;

    const state = [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ];

    const board = await GameBoard.create({
      matchId,
      currentPlayerId,
      state,
    });

    return res.status(201).json(state);
  }

  async move(req: Request, res: Response): Promise<Response> {
    const { x, y, mark } = req.body;

    if (x > 2 || y > 2) {
      throw new BadRequestError("Wrong move.");
    }

    const board = await GameBoard.findByIdAndUpdate(
      req.params.id,
      { $set: { [`state.${x}.${y}`]: mark } },
      { new: true }
    );

    if (!board) {
      throw new NotFoundError("Not Found");
    }

    return res.status(200).json({ board });
  }
}
