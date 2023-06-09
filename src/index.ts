import mongoose from "mongoose";
import { app } from "./app";

const startUp = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined.");
  }

  if (!process.env.MONGO_URI){
    throw new Error("MONGO_URI must be defined.");
  }

  try {
    mongoose.set("strictQuery", false);

    await mongoose.connect(process.env.MONGO_URI);
    console.log("* Tickets - Connected to MongoDB.");
  } catch (err) {
    console.error(err);
  }

  app.listen(3000, () => {
    console.log("* Tickets listening port 3000.");
  });
};

startUp();
