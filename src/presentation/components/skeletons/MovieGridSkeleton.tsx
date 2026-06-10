export default function MovieGridSkeleton({ count = 10 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex flex-col gap-3">
          {/* Poster Skeleton */}
          <div className="w-full aspect-[2/3] bg-slate-200 dark:bg-slate-800 rounded-2xl animate-pulse" />
          {/* Title Skeleton */}
          <div className="h-5 bg-slate-200 dark:bg-slate-800 rounded-md animate-pulse w-3/4" />
          {/* Info Skeleton */}
          <div className="flex gap-2">
            <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-md animate-pulse w-1/4" />
            <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-md animate-pulse w-1/4" />
          </div>
        </div>
      ))}
    </div>
  );
}
