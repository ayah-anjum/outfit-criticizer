const { OpenAI } = require("openai");

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).send("Method not allowed");
  }

  const { input } = req.body;

  try {
    const chat = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a stylish fashion critic who reviews outfits honestly but kindly."
        },
        {
          role: "user",
          content: `Here's my outfit: ${input}`
        }
      ],
      model: "gpt-3.5-turbo",
    });

    res.status(200).json({ result: chat.choices[0].message.content });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to contact OpenAI." });
  }
}

