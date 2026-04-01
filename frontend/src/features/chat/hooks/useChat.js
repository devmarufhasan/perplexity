import { useState } from "react";
import { initializeSocketConnection } from "../services/chat.socket";

const formatTime = (date = new Date()) =>
  new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
  }).format(date);

const formatConversationTime = (dateString) =>
  new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(new Date(dateString));

const truncateText = (value, maxLength = 88) => {
  if (!value) {
    return "";
  }

  return value.length > maxLength ? `${value.slice(0, maxLength)}...` : value;
};

const useChat = () => {
  const [conversation, setConversation] = useState([]);
  const [chats, setChats] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);
  const [draftMessage, setDraftMessage] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const selectedSidebarChat = chats.find((chat) => chat.id === activeChatId);

  const handleSelectChatId = (chatId) => {
    setActiveChatId(chatId);
  };

  const handleDraftChange = (event) => {
    setDraftMessage(event.target.value);
  };

  const handleSendMessage = (event) => {
    event.preventDefault();
    const content = draftMessage.trim();
    if (!content) {
      return;
    }
    setDraftMessage("");
  };

  return {
    chats,
    conversation,
    draftMessage,
    isSidebarOpen,
    activeChatId,
    selectedSidebarChat,
    closeSidebar: () => setIsSidebarOpen(false),
    handleDraftChange,
    handleSelectChatId,
    handleSendMessage,
    openSidebar: () => setIsSidebarOpen(true),
    setChats,
    setConversation,
    formatTime,
    formatConversationTime,
    truncateText,
    initializeSocketConnection,
  };
};

export default useChat;
