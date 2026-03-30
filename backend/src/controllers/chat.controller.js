import env from "../config/env.js";
import ChatModel from "../models/chat.model.js";
import MessageModel from "../models/message.model.js";
import { generateChatTitle, generateResponse } from "../services/ai.service.js";
import {
  getCachedChatHistory,
  setCachedChatHistory,
} from "../services/chat-cache.service.js";
import AppError from "../utils/app-error.js";

function serializeMessage(message) {
  return {
    id: message._id,
    chat: message.chat,
    content: message.content,
    role: message.role,
    createdAt: message.createdAt,
    updatedAt: message.updatedAt,
  };
}

export async function sendMessage(req, res) {
  const { message, chat: chatId } = req.body;
  let chat = null,
    title = null,
    conversationHistory = [];

  if (chatId) {
    try {
      const chatDetails = await ChatModel.findById(chatId);
      if (!chatDetails) {
        throw new AppError("Chat not found", 404, "CHAT_NOT_FOUND", [
          {
            field: "chat",
            message: "Chat with the provided ID does not exist",
            value: chatId,
          },
        ]);
      }

      conversationHistory = await getCachedChatHistory(chatId);

      if (!conversationHistory) {
        const messages = await MessageModel.find({ chat: chatId })
          .sort({
            createdAt: -1,
          })
          .limit(env.chatHistoryLimit)
          .lean();

        conversationHistory = messages.reverse().map(serializeMessage);
        await setCachedChatHistory(chatId, conversationHistory);
      }

      chat = chatDetails;
      title = chatDetails.title;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      } else {
        throw new AppError(
          "An error occurred while fetching the chat",
          500,
          "CHAT_FETCH_ERROR",
          [
            {
              field: "chat",
              message: "An unexpected error occurred while fetching the chat",
              value: chatId,
            },
          ],
        );
      }
    }
  } else {
    title = await generateChatTitle(message);
    chat = await ChatModel.create({
      user: req.user.id,
      title,
    });
  }

  const result = await generateResponse(message, conversationHistory);

  const userMessage = await MessageModel.create({
    chat: chat._id,
    content: message,
    role: "user",
  });

  const aiMessage = await MessageModel.create({
    chat: chat._id,
    content: result,
    role: "ai",
  });

  const updatedConversationHistory = [
    ...conversationHistory,
    serializeMessage(userMessage),
    serializeMessage(aiMessage),
  ].slice(-env.chatHistoryLimit);

  await setCachedChatHistory(chat._id.toString(), updatedConversationHistory);

  res.status(200).json({
    success: true,
    chatTitle: title,
    chat,
    aiMessage,
    userMessage,
    conversationHistory: updatedConversationHistory,
  });
}

export async function getChats(req, res) {
  const chats = await ChatModel.find({ user: req.user.id });

  res.status(200).json({
    success: true,
    chats,
  });
}

export async function getMessages(req, res) {
  const { chatId } = req.params;

  let messages = await getCachedChatHistory(chatId);

  if (!messages) {
    messages = await MessageModel.find({ chat: chatId })
      .sort({ createdAt: 1 })
      .lean();

    messages = messages.map(serializeMessage);
    await setCachedChatHistory(chatId, messages);
  }

  res.status(200).json({
    success: true,
    messages,
  });
}

export async function deleteChat(req, res) {
  const { chatId } = req.params;
  const chat = await ChatModel.findOneAndDelete({
    _id: chatId,
    user: req.user.id,
  });

  if (!chat) {
    throw new AppError("Chat not found", 404, "CHAT_NOT_FOUND", [
      {
        field: "chat",
        message:
          "Chat with the provided ID does not exist or you do not have permission to delete it",
        value: chatId,
      },
    ]);
  }

  await MessageModel.deleteMany({ chat: chatId });
  await setCachedChatHistory(chatId, null);

  res.status(200).json({
    success: true,
    message: "Chat deleted successfully",
  });
}
