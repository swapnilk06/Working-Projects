import express from "express";
import dotenv from "dotenv";
import db from "./utils/db.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";

dotenv.config();

db();

dotenv.config();
const app = express();

// middleware
app.use(express.json());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

// server start
const port = process.env.PORT || 4000;
app.listen(port, (err) => {
  if (err) {
    console.error(`Failed to start server on port ${port}:`, err.message);
    process.exit(1);
  }
  console.log(`Server running on http://localhost:${port}`);
});
