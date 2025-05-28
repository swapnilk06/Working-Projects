import Feedback from "../model/Feedback.model.js";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Function to extract tags
const extractTags = (text) => {
  const keywords = ["interface", "mobile", "performance", "design", "loading", "speed", "user experience"];
  return keywords.filter((word) => text.toLowerCase().includes(word));
};

// POST /api/feedback
export const submitFeedback = async (req, res) => {
  try {
    const { fullName, email, mobile, feedback } = req.body;

    if (!fullName || !email || !mobile || !feedback) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Generate AI response using Gemini
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const result = await model.generateContent(
      `Reply to this feedback in a helpful tone: "${feedback}"`
    );
    const aiReply = result.response.text();

    const tags = extractTags(feedback);

    const newFeedback = new Feedback({
      fullName,
      email,
      mobile,
      feedback,
      aiReply,
      tags,
    });

    await newFeedback.save();

    res.status(201).json({ message: "Feedback submitted successfully", feedback: newFeedback });
  } catch (error) {
    console.error("Error saving feedback:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
