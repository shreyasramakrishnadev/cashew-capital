import { Router, Request, Response } from "express";
import { getAdvisorResponse } from "../services/bedrockClient";
import { generateMockChatResponse } from "../services/chatService";
import { ChatRequest } from "../types";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    const { messages } = req.body as ChatRequest;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      res.status(400).json({ error: "messages array is required" });
      return;
    }

    const useMock = process.env.USE_MOCK_CHATBOT === "true";
    const response = useMock
      ? await generateMockChatResponse(messages)
      : await getAdvisorResponse(messages);

    res.json({ response });
  } catch (err) {
    console.error("Chat error:", err);
    res.status(500).json({ error: "Failed to generate response" });
  }
});

export default router;
