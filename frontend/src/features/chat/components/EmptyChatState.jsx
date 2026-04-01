const EmptyChatState = ({ conversation }) => {
  return (
    <div className="flex flex-1 items-center justify-center bg-slate-50/70 px-6 py-10">
      <div className="max-w-md rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900 text-sm font-semibold text-white">
          AI
        </div>
        <h2 className="mt-5 text-2xl font-semibold text-slate-900">
          {conversation ? "No messages yet" : "Start a conversation"}
        </h2>
        <p className="mt-3 text-sm leading-7 text-slate-600">
          {conversation
            ? "This thread is ready for its first message. Use the input below to start the conversation."
            : "Choose a conversation from the sidebar to review messages or start a fresh thread."}
        </p>
      </div>
    </div>
  );
};

export default EmptyChatState;
