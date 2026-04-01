const SendIcon = () => (
  <svg
    aria-hidden="true"
    className="h-5 w-5"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="1.8"
    viewBox="0 0 24 24"
  >
    <path d="m5 12 14-7-4 7 4 7-14-7Z" />
  </svg>
);

const ChatInputBar = ({
  disabled,
  onChange,
  onSubmit,
  placeholder,
  value,
}) => {
  return (
    <form
      className="shrink-0 border-t border-slate-200 bg-white px-4 py-4 sm:px-6"
      onSubmit={onSubmit}
    >
      <div className="mx-auto flex max-w-4xl items-end gap-3 rounded-3xl border border-slate-200 bg-slate-50 p-3">
        <label className="sr-only" htmlFor="chat-input">
          Chat message
        </label>
        <textarea
          className="min-h-14 flex-1 resize-none bg-transparent px-2 py-2 text-sm text-slate-900 outline-none placeholder:text-slate-400"
          disabled={disabled}
          id="chat-input"
          onChange={onChange}
          placeholder={placeholder}
          rows={1}
          value={value}
        />

        <button
          className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-2xl bg-slate-900 px-4 font-medium text-white transition hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 disabled:cursor-not-allowed disabled:bg-slate-300"
          disabled={disabled || !value.trim()}
          type="submit"
        >
          <span className="hidden sm:inline">Send</span>
          <SendIcon />
        </button>
      </div>
    </form>
  );
};

export default ChatInputBar;
