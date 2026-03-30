import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatMistralAI } from "@langchain/mistralai";
import { AIMessage, HumanMessage, SystemMessage } from "langchain";
import env from "../config/env.js";

const geminiModel = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash-lite",
  apiKey: env.geminiApiKey,
});

const mistralModel = new ChatMistralAI({
  model: "mistral-small-latest",
  apiKey: env.mistralApiKey,
});

export async function generateResponse(message, conversationHistory = []) {
  const historyMessages = conversationHistory.map((entry) =>
    entry.role === "ai"
      ? new AIMessage(entry.content)
      : new HumanMessage(entry.content),
  );

  const response = await geminiModel.invoke([
    ...historyMessages,
    new HumanMessage(message),
  ]);
  return response.text;
}

export async function generateChatTitle(message) {
  const response = await mistralModel.invoke([
    new SystemMessage(
      "You are a helpful assistant that generates concise and descriptive titles for chat conversations. The title should capture the main topic or theme of the conversation in a few words.",
    ),
    new HumanMessage(
      `Generate a concise and descriptive title for the following chat conversation:${message}`,
    ),
  ]);

  return response.text;
}
