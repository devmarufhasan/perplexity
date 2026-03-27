import { initializeSocketConnection } from "../services/chat.socket";

const useChat = () => {
  return {
    initializeSocketConnection,
  };
};

export default useChat;
