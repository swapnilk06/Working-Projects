import Feedback from "../models/Feedback.model.js";
import { generateFeedbackTags } from "../utils/apicall.js";

export const submitFeedback = async (req, res) => {
  const { fullName, email, mobile, message } = req.body;

  try {
    const aiData = await generateFeedbackTags(message);

    const feedback = new Feedback({
      fullName,
      email,
      mobile,
      message,
      aiResponse: aiData.summary,
      tags: aiData.tags,
    });

    await feedback.save();
    res.status(201).json({ message: "Feedback submitted", feedback });
  } catch (error) {
    res.status(500).json({ error: "Failed to process feedback" });
  }
};
