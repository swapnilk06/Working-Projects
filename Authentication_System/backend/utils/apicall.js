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
            text: `You are a team member who directly worked on the client's task. A customer has submitted feedback.

1. Write a **personalized, human-like reply** in **4–5 thoughtful and empathetic lines**, as if you are the actual person who worked on the task. Express understanding, take responsibility where needed, and show genuine intent or care.

🚫 Do **not** include the client’s name, greeting phrases like "Hi", "Hello", "Thanks [Name]", or any templated openings or closings. The tone should feel authentic, not robotic or overly formal.

2. Then, generate **2–4 relevant tags** to categorize the feedback topic (e.g., "delivery", "product quality", "pricing", "customer service").

⚠️ Respond in **strict JSON only**, without markdown, no explanations, and no extra text.



Example format:
{
  "summary": "...",
  "tags": ["...", "..."]
}

Customer Feedback: "${feedbackText}"`,
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

    // Clean output in case Gemini wraps JSON in markdown
    text = text.replace(/```json|```/g, "").trim();

    return JSON.parse(text);
  } catch (err) {
    console.error("Gemini API Error:", err);
    return { summary: "Could not generate", tags: [] };
  }
}
