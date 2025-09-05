import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GOOGLE_AI_API_KEY;

// Initialize the GoogleGenerativeAI client
const genAI = new GoogleGenerativeAI(apiKey);

// Get the Gemini model
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash", // Start with this stable model
});

// Optional generation settings
const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

// Start a chat session
export const AIChatSession = model.startChat({
  generationConfig,
  history: [], // empty history to begin with
});