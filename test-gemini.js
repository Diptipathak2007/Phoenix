import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.VITE_GEMINI_API_KEY);

async function listModels() {
  try {
    const modelsToTest = [
      "gemini-2.0-flash", 
      "gemini-flash-latest",
      "gemini-pro-latest",
      "gemini-2.0-flash-lite"
    ];
    
    for (const modelName of modelsToTest) {
      console.log(`Testing ${modelName}...`);
      try {
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent("Hello");
        console.log(`Success with ${modelName}:`, result.response.text());
      } catch (e) {
        console.error(`Failed with ${modelName}:`, e.message);
      }
    }

  } catch (error) {
    console.error("Error:", error);
  }
}

listModels();
