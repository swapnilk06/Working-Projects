import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import db from "./utils/db.js"; // sometime also write db.js depends on configuration settings

import feedbackRoutes from "./routes/feedback.routes.js";

import cookieParser from "cookie-parser";

// import all routes
import userRoutes from "./routes/user.routes.js";

dotenv.config();
const app = express();

app.use(
	cors({
		origin: "http://localhost:5173",
		credentials: true,
		methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
		allowedHeaders: ['Content-Type', 'Authorization']
	})
);

app.use(express.json()) // for get/post json value
app.use(express.urlencoded({extended:true})) // handle url encoding
app.use(cookieParser()); // access cookies in request/response

const PORT = process.env.PORT || 4000; // don't used common port

// app is web sever - get request on route in "/" 
app.get("/", (req, res) => {
  res.send("Cohort!");
});

// app.get("/hitesh", (req, res) => {
//   res.send("Hitesh");
// });

// app.get("/piyush", (req, res) => {
//   res.send("Piyush");
// });


// Routes
app.use("/api/feedback", feedbackRoutes);

// connect to db
db();

// user routes
app.use("/api/v1/users", userRoutes) // after that "/api/v1/users" anything come that transfer to user


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
})
