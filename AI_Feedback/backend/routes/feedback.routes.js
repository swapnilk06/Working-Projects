import express from "express";
import { submitFeedback } from "../controller/feedback.controller.js";
import { geminiAIProcess } from "../middleware/gemini.middleware.js";

const router = express.Router();

router.post("/submit", geminiAIProcess, submitFeedback);

export default router;
