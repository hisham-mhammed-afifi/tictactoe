import mongoose, { Schema, Document } from "mongoose";

export interface Match extends Document {
  joinCode: string;
  firstPlayerId: string;
  secondPlayerId: string;
  currentPlayerId: string;
}

const matchSchema = new Schema({
  joinCode: { type: String, required: true },
  firstPlayerId: { type: mongoose.Types.ObjectId, required: true },
  secondPlayerId: { type: mongoose.Types.ObjectId },
});

export default mongoose.model<Match>("Match", matchSchema);
