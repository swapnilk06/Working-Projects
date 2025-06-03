import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import cookieParser from "cookie-parser";
import db from "./utils/db.js"; // sometime also write db or db.js depends on configuration settings

import feedbackRoutes from "./routes/feedback.routes.js";

import userRoutes from "./routes/user.routes.js"; // import all routes

const app = express();
app.use(express.json()); // for get/post json value
app.use(express.urlencoded({ extended: true })); // handle url encoding
app.use(cookieParser()); // access cookies in request/response

const PORT = process.env.PORT || 4000; // don't used common port

// app is web sever - get request on route in "/"
app.get("/", (req, res) => {
  res.send("API working");
});

// app.get("/hitesh", (req, res) => {
//   res.send("Hitesh");
// });
// app.get("/piyush", (req, res) => {
//   res.send("Piyush");
// });

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Routes
app.use("/api/feedback", feedbackRoutes);

// connect to db
db();

// user routes
app.use("/api/v1/users", userRoutes); // after that "/api/v1/users" anything come that transfer to user

app.listen(PORT, () => {
  console.log(`Server start on port http://localhost:${PORT}`);
});
