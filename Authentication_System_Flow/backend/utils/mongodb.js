import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();


const db = async () => {
  try {
    const conn = await mongoose.connect(`${process.env.MONGODB_URL}/authentication_system_db`);
    console.log(`MongoDB Database Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("MongoDB Connection Error:", error.message);
    process.exit(1);
  }
};


export default db;
