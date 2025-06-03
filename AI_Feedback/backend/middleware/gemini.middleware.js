import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

// Initialize Gemini with your free API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const geminiAIProcess = async (req, res, next) => {
  try {
    const { feedback } = req.body;

    if (!feedback) {
      return res.status(400).json({ error: "Feedback is required" });
    }

    // Use Gemini 2.5 flash preview model
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash-preview",
    });

    // Prompt to generate response and tags
    const prompt = `
      Based on this user feedback:
      "${feedback}"

      1. Write a short, polite AI-generated response.
      2. Suggest 3-5 relevant tags for categorization (e.g., UI, performance, bug).

      Return ONLY in this strict JSON format:
      {
        "aiResponse": "Your generated response here",
        "tags": ["tag1", "tag2", "tag3"]
      }
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response.text();

    // Clean and parse Gemini's response
    const clean = JSON.parse(response.trim());

    req.body.aiResponse = clean.aiResponse;
    req.body.tags = clean.tags;

    next();
  } catch (error) {
    console.error("Gemini error:", error.message);
    return res
      .status(500)
      .json({ error: "Gemini AI failed to generate response." });
  }
};
