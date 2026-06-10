export default function WatchlistSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Header Skeleton */}
      <div>
        <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded-lg w-48 mb-2" />
        <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-md w-64" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden flex h-32 md:h-40">
            <div className="w-24 md:w-32 shrink-0 bg-slate-200 dark:bg-slate-700" />
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded-md w-3/4 mb-2" />
                <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded-md w-1/2" />
              </div>
              <div className="flex gap-4">
                <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded-lg w-32" />
                <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded-lg w-24" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
