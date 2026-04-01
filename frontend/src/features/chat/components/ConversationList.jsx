import ConversationListItem from "./ConversationListItem";

const ConversationList = ({
  conversations,
  isLoading,
  selectedConversationId,
  onSelectConversation,
}) => {
  if (isLoading) {
    return (
      <div className="space-y-3 p-4" role="status">
        {[1, 2, 3].map((item) => (
          <div
            className="animate-pulse rounded-2xl border border-slate-200 bg-white p-4"
            key={item}
          >
            <div className="h-4 w-2/3 rounded-full bg-slate-200" />
            <div className="mt-3 h-3 w-full rounded-full bg-slate-100" />
            <div className="mt-2 h-3 w-3/4 rounded-full bg-slate-100" />
          </div>
        ))}
      </div>
    );
  }

  if (!conversations.length) {
    return (
      <div className="p-4">
        <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-center text-sm text-slate-500">
          No conversations yet. Start a new thread to begin.
        </div>
      </div>
    );
  }

  return (
    <section className="flex min-h-0 flex-1 flex-col overflow-hidden px-4 pb-4">
      <div className="flex items-center justify-between gap-3 border-b border-slate-200 py-4">
        <div>
          <h2 className="text-sm font-semibold text-slate-900">
            Recent conversations
          </h2>
          <p className="text-xs text-slate-500">Pick a thread to continue.</p>
        </div>

        <button
          className="inline-flex h-9 items-center rounded-xl border border-slate-200 px-3 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300"
          type="button"
        >
          New
        </button>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto py-4">
        <div className="space-y-2.5">
          {conversations.map((conversation) => (
            <ConversationListItem
              conversation={conversation}
              isSelected={conversation.id === selectedConversationId}
              key={conversation.id}
              onSelect={onSelectConversation}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ConversationList;
