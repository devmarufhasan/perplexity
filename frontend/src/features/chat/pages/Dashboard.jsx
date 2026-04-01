import { useEffect } from "react";
import { useSelector } from "react-redux";
import AccountCard from "../components/AccountCard";
import ChatLayout from "../components/ChatLayout";
import ChatPanel from "../components/ChatPanel";
import ChatSidebar from "../components/ChatSidebar";
import ConversationList from "../components/ConversationList";
import useChat from "../hooks/useChat";

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const {
    initializeSocketConnection,
    conversation,
    draftMessage,
    handleDraftChange,
    openSidebar,
    handleSendMessage,
    isSidebarOpen,
    closeSidebar,
    chats,
    activeChatId,
    handleSelectChatId,
  } = useChat();

  useEffect(() => {
    const socket = initializeSocketConnection();

    return () => {
      socket?.disconnect();
    };
  }, [initializeSocketConnection]);

  return (
    <ChatLayout
      panel={
        <ChatPanel
          conversation={conversation}
          draftMessage={draftMessage}
          onDraftChange={handleDraftChange}
          onOpenSidebar={openSidebar}
          onSendMessage={handleSendMessage}
        />
      }
      sidebar={
        <ChatSidebar isOpen={isSidebarOpen} onClose={closeSidebar}>
          <AccountCard user={user} />
          <ConversationList
            conversations={chats}
            isLoading={false}
            selectedConversationId={activeChatId}
            onSelectConversation={handleSelectChatId}
          />
        </ChatSidebar>
      }
    />
  );
};

export default Dashboard;
