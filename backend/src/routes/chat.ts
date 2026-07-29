import { Router, Request, Response } from "express";
import { generateChatResponse } from "../services/chatService";
import { ChatRequest } from "../types";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    const { messages } = req.body as ChatRequest;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      res.status(400).json({ error: "messages array is required" });
      return;
    }

    const response = await generateChatResponse(messages);
    res.json({ response });
  } catch (err) {
    console.error("Chat error:", err);
    res.status(500).json({ error: "Failed to generate response" });
  }
});

export default router;
