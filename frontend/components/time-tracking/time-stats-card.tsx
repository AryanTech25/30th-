"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useTimeTracking, getTimeStatsDisplay } from "@/contexts/time-tracking-context"
import { Clock, TrendingUp, Target, Flame, RotateCcw } from "lucide-react"

export function TimeStatsCard() {
  const { stats, currentSession, isTracking, resetStats } = useTimeTracking()
  const displayStats = getTimeStatsDisplay(stats)

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <Clock className="h-4 w-4" />
          Time Tracking
        </CardTitle>
        {isTracking && (
          <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse"></div>
            Active
          </Badge>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Current Session */}
        {currentSession && (
          <div className="p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Current Session</span>
              <Badge variant="outline" className="text-xs">
                {currentSession.isActive ? "Active" : "Paused"}
              </Badge>
            </div>
            <div className="text-lg font-semibold mt-1">{displayStats.total}</div>
            <div className="text-xs text-muted-foreground">
              Started: {currentSession.startTime.toLocaleTimeString()}
            </div>
          </div>
        )}

        {/* Time Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="text-center p-2">
            <div className="text-lg font-semibold">{displayStats.today}</div>
            <div className="text-xs text-muted-foreground">Today</div>
          </div>
          <div className="text-center p-2">
            <div className="text-lg font-semibold">{displayStats.week}</div>
            <div className="text-xs text-muted-foreground">This Week</div>
          </div>
          <div className="text-center p-2">
            <div className="text-lg font-semibold">{displayStats.total}</div>
            <div className="text-xs text-muted-foreground">Total Time</div>
          </div>
          <div className="text-center p-2">
            <div className="text-lg font-semibold">{stats.sessionsCount}</div>
            <div className="text-xs text-muted-foreground">Sessions</div>
          </div>
        </div>

        {/* Additional Stats */}
        <div className="space-y-2 pt-2 border-t">
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              Average Session
            </span>
            <span className="font-medium">{displayStats.average}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-1">
              <Target className="h-3 w-3" />
              Longest Session
            </span>
            <span className="font-medium">{displayStats.longest}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-1">
              <Flame className="h-3 w-3" />
              Current Streak
            </span>
            <span className="font-medium">{stats.currentStreak} days</span>
          </div>
        </div>

        {/* Reset Button */}
        <Button variant="outline" size="sm" onClick={resetStats} className="w-full mt-4 bg-transparent">
          <RotateCcw className="h-3 w-3 mr-1" />
          Reset Stats
        </Button>
      </CardContent>
    </Card>
  )
}
