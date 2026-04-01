const ChatLayout = ({ sidebar, panel }) => {
  return (
    <main className="h-screen overflow-hidden bg-slate-100 text-slate-900">
      <div className="flex h-full min-h-0 flex-col p-3 sm:p-4 lg:p-5">
        <div className="mx-auto flex h-full min-h-0 w-full max-w-7xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm lg:grid lg:grid-cols-[18rem_minmax(0,1fr)] xl:grid-cols-[20rem_minmax(0,1fr)]">
          {sidebar}
          <div className="min-h-0 min-w-0">{panel}</div>
        </div>
      </div>
    </main>
  );
};

export default ChatLayout;
