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
