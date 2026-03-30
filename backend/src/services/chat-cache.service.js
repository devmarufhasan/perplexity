import env from "../config/env.js";
import { getValkey } from "../config/valkey.js";

function getChatHistoryKey(chatId) {
  return `chat:${chatId}:history`;
}

export async function getCachedChatHistory(chatId) {
  const client = getValkey();

  if (!client) {
    return null;
  }

  const rawHistory = await client.get(getChatHistoryKey(chatId));

  return rawHistory ? JSON.parse(rawHistory) : null;
}

export async function setCachedChatHistory(chatId, conversationHistory) {
  const client = getValkey();

  if (!client) {
    return;
  }

  const limitedConversationHistory = conversationHistory.slice(
    -env.chatHistoryLimit,
  );

  await client.set(
    getChatHistoryKey(chatId),
    JSON.stringify(limitedConversationHistory),
    "EX",
    env.valkeyTtlSeconds,
  );
}

export async function clearCachedChatHistory(chatId) {
  const client = getValkey();

  if (!client) {
    return;
  }

  await client.del(getChatHistoryKey(chatId));
}
