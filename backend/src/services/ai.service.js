import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import env from "../config/env.js";

const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash-lite",
  apiKey: env.geminiApiKey,
});

export async function testAi() {
  model
    .invoke("What is the capital of France?")
    .then((response) => {
      console.log("AI Response:", response.text);
    })
    .catch((error) => {
      console.error("Error invoking AI model:", error);
    });
}
