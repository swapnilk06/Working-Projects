import express from "express";
import { submitFeedback } from "../controllers/feedback.controller.js";
import userAuth from "../middleware/userauth.middleware.js";
import isAdmin from "../middleware/isAdmin.middleware.js";
import Feedback from "../models/Feedback.model.js";
import {
  refreshAIResponse,
  saveAdminResponse,
} from "../controllers/feedback.controller.js";

const router = express.Router();

// Submit feedback (protected route)
router.post("/submit", userAuth, submitFeedback);

// Refresh AI response
router.put("/admin/refresh-ai/:id", isAdmin, refreshAIResponse);

// Save admin-written response
router.put("/admin/save-admin-response/:id", isAdmin, saveAdminResponse);

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

// Admin: Delete user feedback
router.delete("/admin/delete/:id", isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Feedback.findByIdAndDelete(id);
    if (!deleted) {
      return res
        .status(404)
        .json({ success: false, message: "Feedback not found" });
    }
    res.json({ success: true, message: "Feedback deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Admin: Refresh AI Response and Tags
router.put("/admin/refresh/:id", isAdmin, async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);
    if (!feedback) {
      return res
        .status(404)
        .json({ success: false, message: "Feedback not found" });
    }

    const aiData = await generateFeedbackTags(feedback.message);
    feedback.aiResponse = aiData.summary;
    feedback.tags = aiData.tags;
    await feedback.save();

    return res.json({ success: true, updatedFeedback: feedback });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

// Admin: Add admin own response
router.put("/admin/response/:id", isAdmin, async (req, res) => {
  try {
    const { response } = req.body;
    const feedback = await Feedback.findByIdAndUpdate(
      req.params.id,
      { adminResponse: response },
      { new: true }
    );
    if (!feedback) {
      return res
        .status(404)
        .json({ success: false, message: "Feedback not found" });
    }
    res.json({ success: true, updatedFeedback: feedback });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
