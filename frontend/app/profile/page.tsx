"use client"

import { useAuth } from "@/contexts/auth-context"
import { AuthGuard } from "@/components/auth/auth-guard"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { User, Mail, Calendar, Shield, LogOut, Eye, BookOpen, Wrench, Clock, TrendingUp, Award, Target, Activity, Sparkles, Zap, Star } from "lucide-react"
import { useProgress } from "@/contexts/progress-context"
import { useTimeTracking, getTimeStatsDisplay, formatTimeDisplay } from "@/contexts/time-tracking-context"
import { useActivity } from "@/contexts/activity-context"
import { useEffect, useState } from "react"

// Enhanced chart component with animations
function TimeChart({ data }: { data: { label: string; value: number; max: number }[] }) {
  return (
    <div className="space-y-4">
      {data.map((item, index) => (
        <div key={index} className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground font-medium">{item.label}</span>
            <span className="font-bold text-primary">{formatTimeDisplay(item.value)}</span>
          </div>
          <div className="w-full bg-muted/30 rounded-full h-3 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 h-3 rounded-full transition-all duration-1000 ease-out shadow-sm"
              style={{ 
                width: `${Math.min((item.value / item.max) * 100, 100)}%`,
                animation: 'pulse 2s infinite'
              }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

// Animated stat card component
function AnimatedStatCard({ 
  title, 
  value, 
  icon: Icon, 
  color, 
  gradient 
}: { 
  title: string; 
  value: string | number; 
  icon: any; 
  color: string; 
  gradient: string; 
}) {
  return (
    <div className={`text-center p-6 rounded-xl border-2 ${gradient} ${color} transform hover:scale-105 transition-all duration-300 hover:shadow-lg`}>
      <div className="mb-3">
        <Icon className={`h-8 w-8 mx-auto ${color.replace('text-', 'text-').replace('dark:text-', 'dark:text-')}`} />
      </div>
      <div className={`text-3xl font-bold mb-1 ${color.replace('text-', 'text-').replace('dark:text-', 'dark:text-')}`}>
        {value}
      </div>
      <div className={`text-sm font-medium ${color.replace('text-', 'text-').replace('dark:text-', 'dark:text-').replace('600', '600/80').replace('400', '400/80')}`}>
        {title}
      </div>
    </div>
  )
}

export default function ProfilePage() {
  const { user, signOut } = useAuth()
  const { progress } = useProgress()
  const { stats: timeStats, currentSession } = useTimeTracking()
  const { stats: activity } = useActivity()
  const [currentTime, setCurrentTime] = useState(new Date())
  const [liveTimeStats, setLiveTimeStats] = useState(timeStats)

  // Update current time and live stats every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date())
      // Update live time stats to include current session
      setLiveTimeStats({
        ...timeStats,
        todayTime: timeStats.todayTime + (currentSession?.duration || 0),
        totalTime: timeStats.totalTime + (currentSession?.duration || 0)
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [timeStats, currentSession])

  const handleSignOut = async () => {
    try {
      await signOut()
    } catch (error) {
      console.error("Sign out failed:", error)
    }
  }

  // Calculate completion rate
  const completionRate = progress.totalCoursesStarted > 0 
    ? Math.round((progress.totalCoursesCompleted / progress.totalCoursesStarted) * 100)
    : 0

  // Prepare live chart data
  const chartData = [
    { label: "Today", value: liveTimeStats.todayTime, max: 8 * 3600 }, // 8 hours max
    { label: "This Week", value: liveTimeStats.weekTime, max: 40 * 3600 }, // 40 hours max
    { label: "This Month", value: liveTimeStats.monthTime, max: 160 * 3600 }, // 160 hours max
  ]

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <div className="container mx-auto px-4 py-8">
          {/* Enhanced Header */}
          <div className="mb-12 text-center">
            <div className="inline-flex items-center gap-2 mb-4">
              <Sparkles className="h-6 w-6 text-primary animate-pulse" />
              <h1 className="text-5xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                My Learning Dashboard
              </h1>
              <Sparkles className="h-6 w-6 text-primary animate-pulse" />
            </div>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Track your learning journey, achievements, and progress in real-time
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Enhanced Profile Information */}
            <div className="lg:col-span-1">
              <Card className="border-2 border-primary/20 shadow-2xl bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
                <CardHeader className="text-center pb-6">
                  <div className="mx-auto mb-6">
                    <div className="relative">
                      <div className="h-28 w-28 bg-gradient-to-br from-primary via-primary/80 to-primary/60 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-2xl animate-pulse">
                        {user?.name?.charAt(0)}{user?.surname?.charAt(0)}
                      </div>
                      <div className="absolute -top-2 -right-2 h-8 w-8 bg-green-500 rounded-full flex items-center justify-center">
                        <div className="h-3 w-3 bg-white rounded-full animate-ping"></div>
                      </div>
                    </div>
                  </div>
                  <CardTitle className="text-2xl font-bold">{user?.name} {user?.surname}</CardTitle>
                  <p className="text-muted-foreground">@{user?.username}</p>
                  <Badge variant="secondary" className="mt-3 bg-gradient-to-r from-primary/20 to-primary/10 text-primary border-primary/30 px-4 py-1">
                    <Shield className="h-3 w-3 mr-1" />
                    Verified Learner
                  </Badge>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl border border-primary/20">
                      <Mail className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <p className="font-semibold">{user?.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl border border-primary/20">
                      <Calendar className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Member Since</p>
                        <p className="font-semibold">{currentTime.toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}</p>
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    variant="destructive" 
                    className="w-full mt-6 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-lg"
                    onClick={handleSignOut}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Enhanced Stats and Charts */}
            <div className="lg:col-span-2 space-y-8">
              {/* Enhanced Learning Stats */}
              <Card className="border-2 border-primary/20 shadow-2xl bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-2xl">
                    <Target className="h-6 w-6 text-primary" />
                    Learning Statistics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <AnimatedStatCard
                      title="Courses Started"
                      value={progress.totalCoursesStarted}
                      icon={BookOpen}
                      color="text-blue-600 dark:text-blue-400"
                      gradient="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-blue-200 dark:border-blue-800"
                    />
                    <AnimatedStatCard
                      title="Courses Completed"
                      value={progress.totalCoursesCompleted}
                      icon={Award}
                      color="text-green-600 dark:text-green-400"
                      gradient="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 border-green-200 dark:border-green-800"
                    />
                    <AnimatedStatCard
                      title="Courses Explored"
                      value={activity.viewedCourses.length}
                      icon={Eye}
                      color="text-purple-600 dark:text-purple-400"
                      gradient="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 border-purple-200 dark:border-purple-800"
                    />
                    <AnimatedStatCard
                      title="Tools Explored"
                      value={activity.viewedTools.length}
                      icon={Wrench}
                      color="text-orange-600 dark:text-orange-400"
                      gradient="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900 border-orange-200 dark:border-orange-800"
                    />
                  </div>

                  {/* Enhanced Completion Rate */}
                  <div className="mt-8 p-6 bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl border border-primary/20">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-lg font-semibold">Course Completion Rate</span>
                      <span className="text-2xl font-bold text-primary">{completionRate}%</span>
                    </div>
                    <Progress value={completionRate} className="h-3 bg-muted/30" />
                    <div className="mt-2 text-sm text-muted-foreground">
                      {progress.totalCoursesCompleted} of {progress.totalCoursesStarted} courses completed
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Enhanced Time Tracking */}
              <Card className="border-2 border-primary/20 shadow-2xl bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-2xl">
                    <Clock className="h-6 w-6 text-primary" />
                    Live Learning Time
                  </CardTitle>
                  <p className="text-muted-foreground">Your learning activity tracked in real-time</p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Enhanced Time Chart */}
                    <div>
                      <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-primary" />
                        Time Breakdown
                      </h3>
                      <TimeChart data={chartData} />
                    </div>
                    
                    {/* Enhanced Live Stats */}
                    <div className="space-y-6">
                      <div className="p-6 bg-gradient-to-br from-primary/15 to-primary/5 rounded-xl border-2 border-primary/20">
                        <div className="flex items-center gap-3 mb-4">
                          <Activity className="h-5 w-5 text-primary animate-pulse" />
                          <span className="font-bold text-lg">Current Session</span>
                        </div>
                        <div className="text-3xl font-bold text-primary mb-2">
                          {formatTimeDisplay(currentSession?.duration || 0)}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Started at {currentSession?.startTime?.toLocaleTimeString()}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl border border-primary/20 text-center">
                          <div className="text-2xl font-bold text-primary">{timeStats.sessionsCount}</div>
                          <div className="text-sm text-muted-foreground">Total Sessions</div>
                        </div>
                        <div className="p-4 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl border border-primary/20 text-center">
                          <div className="text-2xl font-bold text-primary">{timeStats.currentStreak}</div>
                          <div className="text-sm text-muted-foreground">Day Streak</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Enhanced Achievements */}
              <Card className="border-2 border-primary/20 shadow-2xl bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-2xl">
                    <Star className="h-6 w-6 text-primary" />
                    Achievements & Milestones
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center p-6 bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-950 dark:to-yellow-900 rounded-xl border-2 border-yellow-200 dark:border-yellow-800 transform hover:scale-105 transition-all duration-300">
                      <Award className="h-10 w-10 text-yellow-600 dark:text-yellow-400 mx-auto mb-3" />
                      <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400 mb-1">{progress.totalCertificatesEarned}</div>
                      <div className="text-sm font-medium text-yellow-600/80 dark:text-yellow-400/80">Certificates Earned</div>
                    </div>
                    <div className="text-center p-6 bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-950 dark:to-emerald-900 rounded-xl border-2 border-emerald-200 dark:border-emerald-800 transform hover:scale-105 transition-all duration-300">
                      <Zap className="h-10 w-10 text-emerald-600 dark:text-emerald-400 mx-auto mb-3" />
                      <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mb-1">{formatTimeDisplay(timeStats.longestSession)}</div>
                      <div className="text-sm font-medium text-emerald-600/80 dark:text-emerald-400/80">Longest Session</div>
                    </div>
                    <div className="text-center p-6 bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-950 dark:to-pink-900 rounded-xl border-2 border-pink-200 dark:border-pink-800 transform hover:scale-105 transition-all duration-300">
                      <Sparkles className="h-10 w-10 text-pink-600 dark:text-pink-400 mx-auto mb-3" />
                      <div className="text-2xl font-bold text-pink-600 dark:text-pink-400 mb-1">{activity.viewedCourses.length + activity.viewedTools.length}</div>
                      <div className="text-sm font-medium text-pink-600/80 dark:text-pink-400/80">Total Explored</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  )
}

