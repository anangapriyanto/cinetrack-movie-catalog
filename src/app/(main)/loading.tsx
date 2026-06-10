import MovieGridSkeleton from '@/presentation/components/skeletons/MovieGridSkeleton';

export default function Loading() {
  return (
    <div className="space-y-6">
      <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded-lg w-48 animate-pulse" />
      <MovieGridSkeleton count={10} />
    </div>
  );
}
