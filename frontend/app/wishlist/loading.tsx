import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function WishlistLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <Skeleton className="h-8 w-48 mb-2" />
          <Skeleton className="h-6 w-64" />
        </div>
        <div className="flex gap-3">
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-32" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="group">
            <Skeleton className="aspect-video w-full rounded-t-lg" />
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <Skeleton className="h-6 w-20 mb-2" />
                <Skeleton className="h-8 w-8 rounded-full" />
              </div>
              <Skeleton className="h-6 w-full mb-2" />
              <Skeleton className="h-4 w-3/4" />
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex items-center space-x-4 mb-4">
                <Skeleton className="h-8 w-8 rounded-full" />
                <Skeleton className="h-4 w-32" />
              </div>
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-14" />
                <Skeleton className="h-4 w-18" />
              </div>
              <div className="flex flex-wrap gap-1 mb-4">
                <Skeleton className="h-5 w-16" />
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-5 w-18" />
              </div>
              <div className="flex items-center justify-between">
                <Skeleton className="h-6 w-16" />
                <div className="flex gap-2">
                  <Skeleton className="h-8 w-20" />
                  <Skeleton className="h-8 w-8" />
                </div>
              </div>
              <Skeleton className="h-3 w-24 mx-auto mt-3" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
