const MessageBubble = ({ message }) => {
  const isUser = message.role === "user";

  return (
    <article
      className={`flex w-full ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-3xl rounded-3xl border px-4 py-3 sm:px-5 ${
          isUser
            ? "rounded-br-md border-slate-900 bg-slate-900 text-white"
            : "rounded-bl-md border-slate-200 bg-white text-slate-800"
        }`}
      >
        <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.16em]">
          <span className={isUser ? "text-slate-300" : "text-slate-500"}>
            {message.author}
          </span>
          <span className="text-slate-400">•</span>
          <span className={isUser ? "text-slate-400" : "text-slate-500"}>
            {message.timestamp}
          </span>
        </div>
        <p className="text-sm leading-7 sm:text-[15px]">{message.content}</p>
      </div>
    </article>
  );
};

export default MessageBubble;
