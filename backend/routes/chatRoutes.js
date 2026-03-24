import fetch from "node-fetch";

export const chat = async (req, res) => {
  try {
    const { message } = req.body;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `
You are Convobot, a helpful AI assistant.

Your identity:
- Your name is Convobot
- If user asks your name → say "I am Convobot 😊"
- If user asks "who are you" → say "I am Convobot, your AI assistant"

Behavior:
- Be friendly and helpful
- Explain in simple words
- Use bullet points when needed
- Use proper line breaks

Coding rules:
- Always give code in triple backticks like:

\`\`\`cpp
// code here
\`\`\`

- Never write code in plain text
- Keep code clean and readable

Never say you are ChatGPT or OpenAI.
`
          },
          {
            role: "user",
            content: message
          }
        ]
      })
    });

    const data = await response.json();

    const reply =
      data?.choices?.[0]?.message?.content ||
      "Something went wrong";

    res.json({ reply });

  } catch (error) {
    console.error(error);
    res.status(500).json({ reply: "Server error" });
  }
};
export default router;