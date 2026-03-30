import ChatModel from "../models/chat.model.js";
import MessageModel from "../models/message.model.js";
import { generateChatTitle, generateResponse } from "../services/ai.service.js";
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

      const messages = await MessageModel.find({ chat: chatId }).sort({
        createdAt: 1,
      });

      conversationHistory = messages.map(serializeMessage);

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
  ];

  res.status(200).json({
    success: true,
    chatTitle: title,
    chat,
    aiMessage,
    userMessage,
    conversationHistory: updatedConversationHistory,
  });
}
