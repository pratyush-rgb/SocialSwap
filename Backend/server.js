import express from "express";
import "dotenv/config";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";
import { serve } from "inngest/express";
import { inngest, functions } from "./ingest/index.js";
import { GoogleGenerativeAI } from "@google/generative-ai"; // Added this!

// Initialize the Gemini AI Model
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const aiModel = genAI.getGenerativeModel({ 
  model: "gemini-2.5-flash",
  systemInstruction: `
    You are the official AI Assistant for SocialSwap, a community-driven marketplace.
    
    KEY FACTS ABOUT SOCIALSWAP:
      - Purpose: A platform for Everyone to sell or buy their social media accounts
      - Features: It uses Clerk for secure login
      - Tone: Helpful, encouraging, and tech-savvy.
    
    If someone asks what they can do here, tell them they can list their old semester notes or find used lab equipment. 
    Keep answers short and always mention the benefits of swapping over buying new.
  `
});

const app = express();

app.use(express.json());
app.use(cors());
app.use(clerkMiddleware());

app.get("/", (req, res) => res.send("Server UP!!!"));

app.use("/api/inngest", serve({ client: inngest, functions }));

// --- AI Chatbot Endpoint ---
app.post("/api/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;
    
    if (!userMessage) {
      return res.status(400).json({ error: "Message is required" });
    }

    const result = await aiModel.generateContent(userMessage);
    const replyText = result.response.text();

    res.json({ reply: replyText });

  } catch (error) {
    console.error("AI Chatbot Error:", error);
    res.status(500).json({ error: "Failed to communicate with AI" });
  }
});

const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server Running on port ${PORT}`);
  });
}

export default app;
