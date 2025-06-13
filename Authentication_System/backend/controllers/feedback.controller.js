import Feedback from "../models/Feedback.model.js";
import { generateFeedbackTags } from "../utils/apicall.js";

export const submitFeedback = async (req, res) => {
  const { name, email, mobile, feedback } = req.body;

  try {
    const aiData = await generateFeedbackTags(feedback);

    const newFeedback = new Feedback({
      fullName: name,
      email,
      mobile,
      message: feedback,
      aiResponse: aiData.summary,
      tags: aiData.tags,
    });

    await newFeedback.save();
    res.status(201).json({
      success: true,
      message: "Feedback submitted",
      feedback: newFeedback,
    });
  } catch (error) {
    console.error("Submit feedback error:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to process feedback" });
  }
};

// Update AI response for feedback
export const refreshAIResponse = async (req, res) => {
  const { id } = req.params;

  try {
    const feedback = await Feedback.findById(id);
    if (!feedback)
      return res
        .status(404)
        .json({ success: false, message: "Feedback not found" });

    const newAIData = await generateFeedbackTags(feedback.message);
    feedback.aiResponse = newAIData.summary;
    feedback.tags = newAIData.tags;
    await feedback.save();

    res.json({ success: true, message: "AI response refreshed", feedback });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Failed to refresh AI response" });
  }
};

// Save admin-written response
export const saveAdminResponse = async (req, res) => {
  const { id } = req.params;
  const { adminResponse } = req.body;

  try {
    const feedback = await Feedback.findByIdAndUpdate(
      id,
      { adminResponse },
      { new: true }
    );

    if (!feedback)
      return res
        .status(404)
        .json({ success: false, message: "Feedback not found" });

    res.json({ success: true, message: "Admin response saved", feedback });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Failed to save admin response" });
  }
};
