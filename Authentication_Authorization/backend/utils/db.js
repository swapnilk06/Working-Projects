import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const db = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(
      `MongoDB Connected: ${conn?.connection?.host} & Database: ${conn.connection.name}`
    );
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

export default db;
