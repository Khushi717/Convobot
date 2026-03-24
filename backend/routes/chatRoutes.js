import express from "express";
import { chat } from "../controller/chatController.js";

const router = express.Router();   // ✅ REQUIRED

router.post("/chat", chat);

export default router;