const AccountCard = ({ user }) => {
  const displayName = user?.username || "Workspace user";
  const email = user?.email || "team@perplexity.app";
  const initials = displayName.slice(0, 2).toUpperCase();

  return (
    <section className="shrink-0 border-b border-slate-200 p-4">
      <div className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-sm font-semibold text-white">
          {initials}
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500">
            Account
          </p>
          <h2 className="mt-1 truncate text-sm font-semibold text-slate-900">
            {displayName}
          </h2>
          <p className="truncate text-sm text-slate-600">{email}</p>
        </div>
      </div>
    </section>
  );
};

export default AccountCard;
