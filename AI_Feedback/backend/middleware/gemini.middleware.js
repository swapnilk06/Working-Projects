import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

export const geminiAIProcess = async (req, res, next) => {
  try {
    const { feedback } = req.body;

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // Ask Gemini to give a response and tags
    const prompt = `
      Based on this user feedback:
      "${feedback}"
      
      1. Write a short, polite AI-generated response.
      2. Suggest relevant 3-5 tags for categorization (e.g. UI, performance, bug).
      Return in this JSON format:
      {
        "aiResponse": "...",
        "tags": ["tag1", "tag2"]
      }
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response.text();
    const clean = JSON.parse(response);

    req.body.aiResponse = clean.aiResponse;
    req.body.tags = clean.tags;

    next();
  } catch (error) {
    console.error("Gemini error:", error.message);
    return res.status(500).json({ error: "Gemini AI failed to generate response." });
  }
};
