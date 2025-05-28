import mongoose from "mongoose";

// use of dotenv in that becz of sometime loading 3rd part libraries in that time dotenv not loaded
import dotenv from "dotenv"
dotenv.config()

// goal : export a function that connects to db 

const db = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGO_URL);
		
		console.log(`MongoDB Connected: ${conn?.connection?.host || "localhost"}`);
	} catch (err) {
		console.log("MongoDB Error:", err.message);
		process.exit(1);
  }
};

export default db;

