import dotenv from "dotenv";
dotenv.config(); 

import express from "express";
import cors from "cors";
import chatRoutes from "./routes/chatRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

console.log("SERVER KEY:", process.env.OPENROUTER_API_KEY); // now works

app.use("/api", chatRoutes);

app.get("/", (req, res) => {
  res.send("Convobot backend is running!");
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Convobot backend running on http://localhost:${PORT}`);
});