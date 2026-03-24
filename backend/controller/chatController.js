import { generateResponse } from "../lib/openrouter.js";

export const chat = async (req, res) => {
  try {
    const { message } = req.body;

    console.log("Incoming message:", message); 

    if (!message) {
      return res.json({ reply: "Message missing " });
    }

    const reply = await generateResponse(message);

    res.json({ reply });

  } catch (err) {
    console.error(err);
    res.json({ reply: "Server error " });
  }
};