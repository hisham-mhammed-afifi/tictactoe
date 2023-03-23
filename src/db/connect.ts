import { Application } from "express";
import mongoose from "mongoose";

export default (app: Application) => {
  try {
    mongoose.connect(process.env.MONGODB_URI || "").then(() => {
      console.info("Connected to MongoDB");
      const PORT = process.env.PORT || 3000;
      app.listen(PORT, () => {
        console.info(`http://localhost:${PORT}`);
      });
    });
  } catch (error) {
    console.error(error);
  }
};
