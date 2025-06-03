import mongoose from "mongoose";

// use of dotenv in that becz of sometime loading 3rd part libraries in that time dotenv not loaded
import dotenv from "dotenv";
dotenv.config();

// goal : export a function that connects to db

const db = async () => {
  mongoose.connection.on("connected", () =>
    console.log("MongoDB Database Connected")
  );

  await mongoose.connect(`${process.env.MONGODB_URL}/ai_feedback_db`);
};

export default db;