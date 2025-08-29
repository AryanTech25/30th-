import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Trophy, TrendingUp, Play, Star, Users, Target, User } from "lucide-react"
import Link from "next/link"
import { TimeStatsCard } from "@/components/time-tracking/time-stats-card"
import { AuthGuard } from "@/components/auth/auth-guard"

export default function DashboardPage() {
  return (
    <AuthGuard>
      <div className="container mx-auto px-4 py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Welcome to AIverse Hub!</h1>
        <p className="text-muted-foreground">Start your AI learning journey today</p>
      </div>

      {/* Stats Overview */}
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">50+</div>
            <p className="text-xs text-muted-foreground">From beginner to advanced</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">AI Tools</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">200+</div>
            <p className="text-xs text-muted-foreground">Curated AI platforms</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Learners</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">10K+</div>
            <p className="text-xs text-muted-foreground">Join the community</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">95%</div>
            <p className="text-xs text-muted-foreground">Course completion</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8"> */}
        {/* Featured Courses */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Featured Courses</CardTitle>
              <CardDescription>Start with these popular courses</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4 p-4 border rounded-lg">
                <div className="h-16 w-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Play className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">Deep Learning with PyTorch</h3>
                  <p className="text-sm text-muted-foreground">Master neural networks and deep learning</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm">4.9 (1,234 reviews)</span>
                    <Badge variant="secondary">Beginner</Badge>
                  </div>
                </div>
                <Button size="sm" asChild>
                  <Link href="/courses">Start Course</Link>
                </Button>
              </div>

              <div className="flex items-center space-x-4 p-4 border rounded-lg">
                <div className="h-16 w-16 bg-gradient-to-br from-green-500 to-teal-600 rounded-lg flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">Natural Language Processing</h3>
                  <p className="text-sm text-muted-foreground">Build chatbots and text analysis systems</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm">4.8 (856 reviews)</span>
                    <Badge variant="secondary">Intermediate</Badge>
                  </div>
                </div>
                <Button size="sm" variant="outline" asChild>
                  <Link href="/courses">Explore</Link>
                </Button>
              </div>

              <div className="flex items-center space-x-4 p-4 border rounded-lg">
                <div className="h-16 w-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">Computer Vision Fundamentals</h3>
                  <p className="text-sm text-muted-foreground">Image recognition and processing</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm">4.7 (642 reviews)</span>
                    <Badge variant="secondary">Advanced</Badge>
                  </div>
                </div>
                <Button size="sm" variant="outline" asChild>
                  <Link href="/courses">View Details</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions & Platform Features */}
        <div className="space-y-6">
          {/* Time Tracking Card */}
          <TimeStatsCard />

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Explore Platform</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button asChild className="w-full justify-start">
                <Link href="/courses">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Browse All Courses
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full justify-start bg-transparent">
                <Link href="/tools">
                  <Target className="mr-2 h-4 w-4" />
                  Explore AI Tools
                </Link>
              </Button>
              {/* <Button asChild variant="outline" className="w-full justify-start bg-transparent">
                <Link href="/chat">
                  <Users className="mr-2 h-4 w-4" />
                  Chat with AI Tutor
                </Link>
              </Button> */}
              <Button asChild variant="outline" className="w-full justify-start bg-transparent">
                <Link href="/leaderboard">
                  <Trophy className="mr-2 h-4 w-4" />
                  View Leaderboard
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full justify-start bg-transparent">
                <Link href="/profile">
                  <User className="mr-2 h-4 w-4" />
                  My Profile
                </Link>
              </Button>
              
            </CardContent>
          </Card>

          {/* Platform Features */}
          <Card>
            <CardHeader>
              <CardTitle>Platform Features</CardTitle>
              <CardDescription>Everything you need to master AI</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-sm">Interactive Learning</h4>
                  <Badge variant="secondary">New</Badge>
                </div>
                <p className="text-xs text-muted-foreground">Hands-on projects and coding exercises</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-sm">AI-Powered Tutoring</h4>
                  <Badge variant="outline">Popular</Badge>
                </div>
                <p className="text-xs text-muted-foreground">Get personalized help from AI assistants</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-sm">Career Guidance</h4>
                  <Badge variant="outline">Featured</Badge>
                </div>
                <p className="text-xs text-muted-foreground">Navigate your AI career path</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AuthGuard>
  )
}
