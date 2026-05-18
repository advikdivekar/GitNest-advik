const Skeleton = ({ className = '' }) => (
  <div className={`animate-pulse rounded-md bg-zinc-200 dark:bg-zinc-700 ${className}`} />
);

export const ProfileSkeleton = () => (
  <div className="max-w-4xl mx-auto px-4 py-10">
    <div className="flex flex-col sm:flex-row gap-6 items-start">
      <Skeleton className="w-24 h-24 rounded-full shrink-0" />
      <div className="flex-1 space-y-3 w-full">
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-4 w-64" />
        <Skeleton className="h-4 w-32" />
        <div className="flex gap-4 pt-1">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-20" />
        </div>
        <Skeleton className="h-9 w-28 mt-2" />
      </div>
    </div>
    <div className="mt-10 space-y-4">
      <Skeleton className="h-5 w-36" />
      {[...Array(3)].map((_, i) => (
        <div key={i} className="border border-zinc-200 dark:border-zinc-700 rounded-lg p-4 space-y-2">
          <Skeleton className="h-4 w-48" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-24" />
        </div>
      ))}
    </div>
  </div>
);

export default Skeleton;
