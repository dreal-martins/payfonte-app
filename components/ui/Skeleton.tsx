export function SkeletonCard() {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 space-y-4 animate-pulse">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-zinc-800" />
        <div className="space-y-2 flex-1">
          <div className="h-4 bg-zinc-800 rounded w-2/3" />
          <div className="h-3 bg-zinc-800 rounded w-1/3" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="h-8 bg-zinc-800 rounded-lg" />
        <div className="h-8 bg-zinc-800 rounded-lg" />
      </div>
    </div>
  );
}

export function SkeletonGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {Array.from({ length: 12 }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
