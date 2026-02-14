// ── Global Loading Skeleton ───────────────────────────────────────
// Displayed during navigation while page components load

export default function Loading() {
  return (
    <div className="min-h-screen bg-brand-cream-100">

      {/* Hero skeleton */}
      <div className="relative min-h-[92vh] bg-brand-gradient flex items-center overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-lg space-y-6 py-20">
            <div className="skeleton h-3 w-32 rounded-full" />
            <div className="skeleton h-12 w-full rounded-xl" />
            <div className="skeleton h-12 w-4/5 rounded-xl" />
            <div className="skeleton h-1 w-24 rounded-full" />
            <div className="space-y-2">
              <div className="skeleton h-4 w-full rounded-md" />
              <div className="skeleton h-4 w-4/5 rounded-md" />
              <div className="skeleton h-4 w-3/5 rounded-md" />
            </div>
            <div className="flex gap-4 pt-2">
              <div className="skeleton h-12 w-44 rounded-full" />
              <div className="skeleton h-12 w-32 rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Categories skeleton */}
      <div className="py-20 bg-brand-cream-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 space-y-4">
            <div className="skeleton h-3 w-40 mx-auto rounded-full" />
            <div className="skeleton h-9 w-56 mx-auto rounded-lg" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="skeleton rounded-luxury aspect-[3/4] md:aspect-[4/5]" />
            ))}
          </div>
        </div>
      </div>

      {/* Products skeleton */}
      <div className="py-20 bg-brand-cream-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 space-y-4">
            <div className="skeleton h-3 w-48 mx-auto rounded-full" />
            <div className="skeleton h-9 w-64 mx-auto rounded-lg" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="rounded-luxury overflow-hidden shadow-card">
                <div className="skeleton aspect-[3/4]" />
                <div className="bg-white p-4 space-y-2.5">
                  <div className="skeleton h-2.5 w-16 rounded-full" />
                  <div className="skeleton h-4 w-full rounded-md" />
                  <div className="skeleton h-4 w-2/3 rounded-md" />
                  <div className="flex justify-between items-center pt-1">
                    <div className="skeleton h-5 w-20 rounded-md" />
                    <div className="skeleton w-9 h-9 rounded-full" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
