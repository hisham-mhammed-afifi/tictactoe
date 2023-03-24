import mongoose, { Schema, Document } from "mongoose";

export interface GameBoard extends Document {
  matchId: string;
  currentPlayerId: string;
  state: boolean[][];
}

const boardSchema = new Schema({
  matchId: { type: mongoose.Types.ObjectId, required: true, ref: "Match" },
  currentPlayerId: { type: mongoose.Types.ObjectId },
  state: [[{ type: String, default: null }]],
});

export default mongoose.model<GameBoard>("GameBoard", boardSchema);
