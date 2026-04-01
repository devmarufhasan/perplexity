const ChatSidebar = ({ children, isOpen, onClose }) => {
  return (
    <>
      <div
        aria-hidden={!isOpen}
        className={`fixed inset-0 z-30 bg-slate-950/35 transition lg:hidden ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
      />

      <aside
        aria-label="Conversation sidebar"
        className={`fixed inset-y-0 left-0 z-40 flex min-h-0 w-[88vw] max-w-[20rem] flex-col border-r border-slate-200 bg-white transition duration-200 lg:static lg:z-auto lg:w-full lg:max-w-none lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-slate-200 px-4 py-4 lg:hidden">
          <p className="text-sm font-semibold text-slate-900">Conversations</p>
          <button
            className="inline-flex h-10 items-center justify-center rounded-xl border border-slate-200 px-3 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300"
            onClick={onClose}
            type="button"
          >
            Close
          </button>
        </div>

        {children}
      </aside>
    </>
  );
};

export default ChatSidebar;
