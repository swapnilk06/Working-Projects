import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=" +
  process.env.GEMINI_API_KEY;

export async function generateFeedbackTags(feedbackText) {
  const body = {
    contents: [
      {
        parts: [
          {
            text: `Please summarize the following feedback and extract 2-4 tags. Respond **only** in pure JSON (no markdown or explanation). Format:
            {
              "summary": "...",
              "tags": ["...", "..."]
            }
            Feedback: "${feedbackText}"`,
          },
        ],
      },
    ],
  };

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const result = await response.json();
    let text = result.candidates[0].content.parts[0].text;

    // Remove triple backticks and "json" if present
    text = text.replace(/```json|```/g, "").trim();

    return JSON.parse(text);
  } catch (err) {
    console.error("Gemini API Error:", err);
    return { summary: "Could not generate", tags: [] };
  }
}
