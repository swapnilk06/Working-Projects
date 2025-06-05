import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";

import db from "./utils/mongodb.js";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";

const app = express();
const port = process.env.PORT || 4000; // app running port
db(); // mongoDB connection

const allowedOrigins = ["http://localhost:5173"];

app.use(express.json()); // all the request will pass using json
app.use(cookieParser());
app.use(cors({ origin: allowedOrigins, credentials: true })); // will send the cookies in the response
// origin writing for frontend connection with backend

// API Endpoints
app.get("/", (req, res) => res.send("API Working Successfully")); // msg visible
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

app.listen(port, () => console.log(`Server start on port: ${port}`)); // after start backend show that message
