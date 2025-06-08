import dotenv from 'dotenv';
dotenv.config();

const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=" + process.env.GEMINI_API_KEY;

export async function generateFeedbackTags(feedbackText) {
  const body = {
    contents: [
      {
        parts: [{ text: `Classify and summarize this customer feedback: "${feedbackText}". Return a JSON with "summary" and "tags".` }]
      }
    ]
  };

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });

    const result = await response.json();
    const text = result.candidates[0].content.parts[0].text;
    return JSON.parse(text);
  } catch (err) {
    console.error("Gemini API Error:", err);
    return { summary: "Could not generate", tags: [] };
  }
}
