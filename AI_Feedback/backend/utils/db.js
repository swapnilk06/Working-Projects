import mongoose from "mongoose";

// use of dotenv in that becz of sometime loading 3rd part libraries in that time doytenv not loaded
import dotenv from "dotenv"
dotenv.config()

// goal : export a function that connects to db 

const db = () => {
	mongoose.connect(process.env.MONGO_URL)
	.then(() => {
		console.log("Connected to mongodb");
	})
	.catch((err) => {
		console.log("Error connecting to mongodb");
	})
}

export default db;

