const statusStyles = {
  active: "bg-emerald-500",
  empty: "bg-amber-500",
  idle: "bg-slate-300",
  loading: "bg-sky-500 animate-pulse",
};

const ConversationListItem = ({ conversation, isSelected, onSelect }) => {
  return (
    <button
      aria-pressed={isSelected}
      className={`group w-full rounded-2xl border px-4 py-3 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 ${
        isSelected
          ? "border-slate-900 bg-slate-900 text-white"
          : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
      }`}
      onClick={() => onSelect(conversation.id)}
      type="button"
    >
      <div className="flex items-start gap-3">
        <div
          className={`mt-1 h-2.5 w-2.5 rounded-full ${
            statusStyles[conversation.status] || statusStyles.idle
          }`}
        />

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <h3
              className={`truncate text-sm font-medium ${
                isSelected ? "text-white" : "text-slate-900"
              }`}
            >
              {conversation.title}
            </h3>
            <span
              className={`shrink-0 text-xs ${
                isSelected ? "text-slate-300" : "text-slate-500"
              }`}
            >
              {conversation.updatedAt}
            </span>
          </div>

          <p
            className={`mt-1 line-clamp-2 text-sm transition ${
              isSelected
                ? "text-slate-300"
                : "text-slate-600 group-hover:text-slate-700"
            }`}
          >
            {conversation.preview}
          </p>

          <div className="mt-3 flex items-center justify-between gap-3">
            <span
              className={`text-xs font-medium uppercase tracking-[0.16em] ${
                isSelected ? "text-slate-400" : "text-slate-500"
              }`}
            >
              {conversation.assistantStatus}
            </span>

            {conversation.unreadCount > 0 ? (
              <span
                className={`inline-flex min-w-6 items-center justify-center rounded-full px-2 py-1 text-[11px] font-semibold ${
                  isSelected
                    ? "bg-white text-slate-900"
                    : "bg-slate-900 text-white"
                }`}
              >
                {conversation.unreadCount}
              </span>
            ) : null}
          </div>
        </div>
      </div>
    </button>
  );
};

export default ConversationListItem;
