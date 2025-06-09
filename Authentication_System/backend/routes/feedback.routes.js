import express from "express";
import { submitFeedback } from "../controllers/feedback.controller.js";
import userAuth from "../middleware/userauth.middleware.js";

const router = express.Router();

router.post("/submit", userAuth, submitFeedback);

export default router;
