import MovieGridSkeleton from '@/presentation/components/skeletons/MovieGridSkeleton';

export default function Loading() {
  return (
    <div className="space-y-6">
      <div>
        <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded-lg w-48 animate-pulse mb-2" />
        <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-md w-64 animate-pulse" />
      </div>
      <MovieGridSkeleton count={15} />
    </div>
  );
}
