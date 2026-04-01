import ChatHeader from "./ChatHeader";
import ChatInputBar from "./ChatInputBar";
import EmptyChatState from "./EmptyChatState";
import MessageList from "./MessageList";

const LoadingState = () => {
  return (
    <div className="flex flex-1 flex-col gap-4 px-4 py-5 sm:px-6" role="status">
      {[1, 2, 3].map((item) => (
        <div
          className={`animate-pulse rounded-3xl border border-slate-200 bg-white p-4 ${
            item === 2 ? "ml-auto w-[75%]" : "w-[82%]"
          }`}
          key={item}
        >
          <div className="h-4 w-24 rounded-full bg-slate-200" />
          <div className="mt-4 h-3 w-full rounded-full bg-slate-100" />
          <div className="mt-2 h-3 w-4/5 rounded-full bg-slate-100" />
        </div>
      ))}
    </div>
  );
};

const ChatPanel = ({
  conversation,
  draftMessage,
  onDraftChange,
  onOpenSidebar,
  onSendMessage,
}) => {
  const hasMessages = Boolean(conversation?.messages?.length);
  const isLoading = conversation?.isLoading;
  const isDisabled = !conversation || isLoading;

  return (
    <section className="flex h-full min-h-0 min-w-0 flex-1 flex-col overflow-hidden bg-white">
      <ChatHeader conversation={conversation} onOpenSidebar={onOpenSidebar} />

      <div className="flex min-h-0 flex-1 flex-col">
        {isLoading ? (
          <LoadingState />
        ) : hasMessages ? (
          <MessageList messages={conversation.messages} />
        ) : (
          <EmptyChatState conversation={conversation} />
        )}
      </div>

      <ChatInputBar
        disabled={isDisabled}
        onChange={onDraftChange}
        onSubmit={onSendMessage}
        placeholder={
          isLoading
            ? "This conversation is still loading..."
            : conversation
              ? "Type your message..."
              : "Select a conversation to start chatting..."
        }
        value={draftMessage}
      />
    </section>
  );
};

export default ChatPanel;
