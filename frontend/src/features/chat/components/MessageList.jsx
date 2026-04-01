import MessageBubble from "./MessageBubble";

const MessageList = ({ messages }) => {
  return (
    <div className="min-h-0 flex-1 overflow-y-auto bg-slate-50/70 px-4 py-5 sm:px-6">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-4">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
      </div>
    </div>
  );
};

export default MessageList;
