const MenuIcon = () => (
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
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);

const ChatHeader = ({ conversation, onOpenSidebar }) => {
  return (
    <header className="flex shrink-0 items-center justify-between gap-4 border-b border-slate-200 px-4 py-4 sm:px-6">
      <div className="flex min-w-0 items-center gap-3">
        <button
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 lg:hidden"
          onClick={onOpenSidebar}
          type="button"
        >
          <span className="sr-only">Open conversation sidebar</span>
          <MenuIcon />
        </button>

        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500">
            Active thread
          </p>
          <h1 className="truncate text-lg font-semibold text-slate-900 sm:text-xl">
            {conversation?.title || "Select a conversation"}
          </h1>
          <p className="mt-1 truncate text-sm text-slate-600">
            {conversation
              ? `${conversation.assistantName} • ${conversation.assistantStatus}`
              : "Choose a thread from the sidebar to begin chatting."}
          </p>
        </div>
      </div>

      {conversation ? (
        <div className="hidden shrink-0 items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700 sm:inline-flex">
          <span
            className={`h-2 w-2 rounded-full ${
              conversation.isLoading ? "bg-amber-500" : "bg-emerald-500"
            }`}
          />
          {conversation.isLoading ? "Updating" : "Available"}
        </div>
      ) : null}
    </header>
  );
};

export default ChatHeader;
