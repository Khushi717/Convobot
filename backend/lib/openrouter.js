import fetch from "node-fetch";
import Info from "../controller/info.js";

export const generateResponse = async (message) => {
  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "openai/gpt-4o-mini", 
        messages: [
          {
            role: "system",
            content: Info
          },
          {
            role: "user",
            content: message
          }
        ]
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("OpenRouter Error:", data);
      return "API Error";
    }

    let reply =
      data?.choices?.[0]?.message?.content ||
      "Something went wrong";

    const msg = message.toLowerCase();
    if (msg.includes("name") || msg.includes("who")) {
      return "I am Convobot 😊";
    }

    return reply;

  } catch (error) {
    console.error(error);
    return "Server error";
  }
};