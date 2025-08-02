const { OpenAI } = require("openai");

// Initialize OpenAI client
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Helper function to add timeout to promises
const withTimeout = (promise, ms) => {
  const timeout = new Promise((_, reject) => {
    setTimeout(() => reject(new Error("Request timed out")), ms);
  });
  return Promise.race([promise, timeout]);
};

export default async function handler(req, res) {
  // Check for POST method
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Validate request body
  const { input } = req.body;
  if (!input || typeof input !== "string" || input.trim().length === 0) {
    return res.status(400).json({ error: "Invalid or missing input" });
  }

  try {
    // Make OpenAI API call with a 10-second timeout
    const chat = await withTimeout(
      openai.chat.completions.create({
        messages: [
          {
            role: "system",
            content: "You are a stylish fashion critic who reviews outfits honestly but kindly.",
          },
          {
            role: "user",
            content: `Here's my outfit: ${input}`,
          },
        ],
        model: "gpt-4o-mini", // Updated to a more reliable model; revert to gpt-3.5-turbo if needed
      }),
      10000 // 10-second timeout
    );

    // Return the response
    res.status(200).json({ result: chat.choices[0].message.content });
  } catch (err) {
    console.error("Error in OpenAI API call:", err);
    // Handle specific OpenAI errors
    if (err.message.includes("timed out")) {
      return res.status(504).json({ error: "Request to OpenAI timed out" });
    }
    if (err.status === 401) {
      return res.status(401).json({ error: "Invalid OpenAI API key" });
    }
    if (err.status === 429) {
      return res.status(429).json({ error: "OpenAI rate limit exceeded" });
    }
    return res.status(500).json({ error: "Failed to process request" });
  }
}