export default function MovieDetailsSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Backdrop Area */}
      <div className="w-full h-[50vh] min-h-[400px] max-h-[600px] bg-slate-200 dark:bg-slate-800 rounded-3xl" />
      
      {/* Content Area */}
      <div className="container mx-auto px-4 -mt-32 relative z-10 flex flex-col md:flex-row gap-8">
        {/* Poster */}
        <div className="w-48 md:w-64 shrink-0 rounded-2xl bg-slate-300 dark:bg-slate-700 aspect-[2/3] shadow-2xl" />
        
        {/* Details */}
        <div className="flex-1 pt-4 md:pt-32 space-y-4">
          <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded-lg w-2/3" />
          <div className="flex gap-4 mt-2">
            <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded-md w-24" />
            <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded-md w-24" />
          </div>
          <div className="space-y-2 mt-8">
            <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-md w-full" />
            <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-md w-full" />
            <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-md w-5/6" />
          </div>
        </div>
      </div>
    </div>
  );
}
