import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcrypt";

export interface User extends Document {
  role: string;
  name: string;
  email: string;
  password: string;
  comparePassword: (password: string) => Promise<boolean>;
}

const userSchema = new Schema({
  role: { type: String, required: true, default: "user" },
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparePassword = async function (
  canditatePassword: string
): Promise<boolean> {
  return await bcrypt.compare(canditatePassword, this.password);
};

export default mongoose.model<User>("User", userSchema);
