import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.VITE_GEMINI_API_KEY);

async function listModels() {
  try {
    console.log("Testing gemini-1.5-flash-8b...");
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-8b" });
        const result = await model.generateContent("Hello");
        console.log("Success with gemini-1.5-flash-8b:", result.response.text());
    } catch (e) {
        console.error("Failed with gemini-1.5-flash-8b:", e.message);
    }

    console.log("Testing gemini-1.5-pro-latest...");
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });
        const result = await model.generateContent("Hello");
        console.log("Success with gemini-1.5-pro-latest:", result.response.text());
    } catch (e) {
        console.error("Failed with gemini-1.5-pro-latest:", e.message);
    }

  } catch (error) {
    console.error("Error:", error);
  }
}

listModels();
