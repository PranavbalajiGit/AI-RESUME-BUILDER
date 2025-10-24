// Use the working Google Generative AI SDK
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GOOGLE_AI_API_KEY;

// Initialize the GoogleGenerativeAI client with just the API key
const genAI = new GoogleGenerativeAI(apiKey);

// Get the model - use gemini-2.5-flash (the stable version)
const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash", // Updated to the stable 2.5 Flash model
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

// Note: If you want to use the latest preview version for better performance,
// you can use "gemini-2.5-flash-preview-09-2025" instead
// But "gemini-2.5-flash" is the recommended stable version