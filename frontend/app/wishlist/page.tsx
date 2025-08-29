"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useWishlist } from "@/contexts/wishlist-context"
import { Clock, Users, Star, BookOpen, Award, Heart, Trash2, Play } from "lucide-react"
import Link from "next/link"
import { useProgress } from "@/contexts/progress-context"

export default function WishlistPage() {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist()
  const { startCourse, getCourseProgress } = useProgress()

  const handleStartCourse = (courseId: string) => {
    startCourse(courseId)
  }

  const handleRemoveFromWishlist = (courseId: string) => {
    removeFromWishlist(courseId)
  }

  if (wishlist.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6">
            <Heart className="w-12 h-12 text-muted-foreground" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Your Wishlist is Empty</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Start exploring courses and add them to your wishlist to keep track of what you want to learn.
          </p>
          <div className="flex gap-3 justify-center">
            <Button asChild size="lg">
              <Link href="/courses">
                <BookOpen className="mr-2 h-4 w-4" />
                Browse Courses
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/tools">
                <BookOpen className="mr-2 h-4 w-4" />
                Browse Tools
              </Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">My Wishlist</h1>
          <p className="text-lg text-muted-foreground">
            {wishlist.length} course{wishlist.length !== 1 ? 's' : ''} saved for later
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={clearWishlist}>
            <Trash2 className="mr-2 h-4 w-4" />
            Clear All
          </Button>
          <div className="flex gap-2">
            <Button asChild variant="outline">
              <Link href="/courses">
                <BookOpen className="mr-2 h-4 w-4" />
                Browse More Courses
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/tools">
                <BookOpen className="mr-2 h-4 w-4" />
                Browse More Tools
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlist.map((course) => {
          const isTool = course.itemType === 'tool'
          const courseProgress = !isTool ? getCourseProgress(course.id) : null
          const isEnrolled = !!courseProgress
          const displayPrice = isTool ? course.price : "Free"

          return (
            <Card key={`${course.itemType}-${course.id}`} className="group hover:shadow-lg transition-all duration-200">
              <div className="aspect-video bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 rounded-t-lg overflow-hidden">
                {course.thumbnail && course.thumbnail !== "/placeholder.svg" ? (
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = "/placeholder.jpg"
                      target.onerror = null
                      target.nextElementSibling?.classList.remove("hidden")
                    }}
                  />
                ) : null}
                <div
                  className={`w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary/20 ${course.thumbnail && course.thumbnail !== "/placeholder.svg" ? "hidden" : ""}`}
                >
                  <div className="text-center">
                    <div className="h-16 w-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-2xl font-bold text-primary">{course.title.charAt(0)}</span>
                    </div>
                    <p className="text-sm font-medium text-primary/80">{course.title}</p>
                  </div>
                </div>
              </div>

              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <Badge variant="outline" className="mb-2">
                    {isTool ? 'Tool' : course.level}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveFromWishlist(course.id)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
                  >
                    <Heart className="h-4 w-4 fill-red-500" />
                  </Button>
                </div>
                <CardTitle className="text-lg line-clamp-2">{course.title}</CardTitle>
                <CardDescription className="line-clamp-2">{course.description}</CardDescription>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="flex items-center space-x-4 mb-4">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={course.instructorAvatar || "/placeholder.svg"} alt={course.instructor} />
                    <AvatarFallback>
                      {course.instructor
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{course.instructor}</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mb-4">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="h-3 w-3" />
                    <span>{course.students.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span>{course.rating}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <BookOpen className="h-3 w-3" />
                    <span>{course.tags.length} {isTool ? 'tags' : 'topics'}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  {course.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {course.tags.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{course.tags.length - 3} more
                    </Badge>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <Badge variant={displayPrice === "Free" ? "secondary" : "default"}>{displayPrice}</Badge>
                  <div className="flex gap-2">
                    {isTool ? (
                      <Button size="sm" variant="outline" asChild>
                        <Link href={course.website || '#'} target="_blank" rel="noopener noreferrer">
                          <Play className="mr-1 h-3 w-3" />
                          Open Tool
                        </Link>
                      </Button>
                    ) : (
                      isEnrolled ? (
                        <Button size="sm" variant="outline" asChild>
                          <Link href={`/courses/${course.id}/modules/module-1`}>
                            <Play className="mr-1 h-3 w-3" />
                            Continue
                          </Link>
                        </Button>
                      ) : (
                        <Button size="sm" onClick={() => handleStartCourse(course.id)}>
                          <Play className="mr-1 h-3 w-3" />
                          Start Course
                        </Button>
                      )
                    )}
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleRemoveFromWishlist(course.id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>

                <div className="text-xs text-muted-foreground mt-3 text-center">
                  Added {course.addedAt.toLocaleDateString()}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
