import express from "express";
import { submitFeedback } from "../controllers/feedback.controller.js";
import userAuth from "../middleware/userauth.middleware.js";
import isAdmin from "../middleware/isAdmin.middleware.js";
import Feedback from "../models/Feedback.model.js";

const router = express.Router();

// Submit feedback (protected route)
router.post("/submit", userAuth, submitFeedback);

// Admin: Get all feedback
router.get("/all", isAdmin, async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });

    if (!feedbacks || feedbacks.length === 0) {
      return res.json({ success: false, message: "No feedback found" });
    }

    return res.json({ success: true, feedbacks });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
