"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState, useRef } from "react"

interface TimeSession {
  id: string
  startTime: Date
  endTime?: Date
  duration: number // in seconds
  page: string
  isActive: boolean
}

interface TimeStats {
  totalTime: number // in seconds
  todayTime: number
  weekTime: number
  monthTime: number
  sessionsCount: number
  averageSessionTime: number
  longestSession: number
  currentStreak: number
  lastActiveDate: Date | null
}

interface TimeTrackingContextType {
  stats: TimeStats
  currentSession: TimeSession | null
  isTracking: boolean
  startTracking: (page: string) => void
  stopTracking: () => void
  updatePage: (page: string) => void
  getTimeSpent: (format?: "seconds" | "minutes" | "hours" | "formatted") => string | number
  resetStats: () => void
}

const TimeTrackingContext = createContext<TimeTrackingContextType | undefined>(undefined)

export function useTimeTracking() {
  const context = useContext(TimeTrackingContext)
  if (context === undefined) {
    throw new Error("useTimeTracking must be used within a TimeTrackingProvider")
  }
  return context
}

const TIME_STORAGE_KEY = "aiverse_time_tracking"
const SESSIONS_STORAGE_KEY = "aiverse_sessions"
const IDLE_THRESHOLD = 5 * 60 * 1000 // 5 minutes in milliseconds

function formatTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60

  if (hours > 0) {
    return `${hours}h ${minutes}m`
  } else if (minutes > 0) {
    return `${minutes}m ${secs}s`
  } else {
    return `${secs}s`
  }
}

function getStoredStats(): TimeStats {
  if (typeof window === "undefined") {
    return {
      totalTime: 0,
      todayTime: 0,
      weekTime: 0,
      monthTime: 0,
      sessionsCount: 0,
      averageSessionTime: 0,
      longestSession: 0,
      currentStreak: 0,
      lastActiveDate: null,
    }
  }

  const stored = localStorage.getItem(TIME_STORAGE_KEY)
  if (!stored) {
    return {
      totalTime: 0,
      todayTime: 0,
      weekTime: 0,
      monthTime: 0,
      sessionsCount: 0,
      averageSessionTime: 0,
      longestSession: 0,
      currentStreak: 0,
      lastActiveDate: null,
    }
  }

  const parsed = JSON.parse(stored)
  return {
    ...parsed,
    lastActiveDate: parsed.lastActiveDate ? new Date(parsed.lastActiveDate) : null,
  }
}

function saveStats(stats: TimeStats) {
  if (typeof window === "undefined") return
  localStorage.setItem(TIME_STORAGE_KEY, JSON.stringify(stats))
}

function getStoredSessions(): TimeSession[] {
  if (typeof window === "undefined") return []
  const stored = localStorage.getItem(SESSIONS_STORAGE_KEY)
  if (!stored) return []

  const sessions = JSON.parse(stored)
  return sessions.map((session: any) => ({
    ...session,
    startTime: new Date(session.startTime),
    endTime: session.endTime ? new Date(session.endTime) : undefined,
  }))
}

function saveSessions(sessions: TimeSession[]) {
  if (typeof window === "undefined") return
  localStorage.setItem(SESSIONS_STORAGE_KEY, JSON.stringify(sessions))
}

function calculateTimeStats(sessions: TimeSession[]): Partial<TimeStats> {
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
  const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)

  const completedSessions = sessions.filter((s) => s.endTime)

  const totalTime = completedSessions.reduce((sum, session) => sum + session.duration, 0)
  const todayTime = completedSessions
    .filter((s) => s.startTime >= today)
    .reduce((sum, session) => sum + session.duration, 0)
  const weekTime = completedSessions
    .filter((s) => s.startTime >= weekAgo)
    .reduce((sum, session) => sum + session.duration, 0)
  const monthTime = completedSessions
    .filter((s) => s.startTime >= monthAgo)
    .reduce((sum, session) => sum + session.duration, 0)

  const averageSessionTime = completedSessions.length > 0 ? Math.round(totalTime / completedSessions.length) : 0
  const longestSession = completedSessions.length > 0 ? Math.max(...completedSessions.map((s) => s.duration)) : 0

  // Calculate current streak (consecutive days with activity)
  let currentStreak = 0
  const sortedDays = [
    ...new Set(
      completedSessions.map((s) =>
        new Date(s.startTime.getFullYear(), s.startTime.getMonth(), s.startTime.getDate()).getTime(),
      ),
    ),
  ].sort((a, b) => b - a)

  if (sortedDays.length > 0) {
    const todayTime = today.getTime()
    let checkDate = todayTime

    for (const dayTime of sortedDays) {
      if (dayTime === checkDate) {
        currentStreak++
        checkDate -= 24 * 60 * 60 * 1000 // Go back one day
      } else if (dayTime === checkDate + 24 * 60 * 60 * 1000) {
        // If today has no activity but yesterday does, start from yesterday
        if (currentStreak === 0 && dayTime === todayTime - 24 * 60 * 60 * 1000) {
          currentStreak++
          checkDate = dayTime - 24 * 60 * 60 * 1000
        } else {
          break
        }
      } else {
        break
      }
    }
  }

  return {
    totalTime,
    todayTime,
    weekTime,
    monthTime,
    sessionsCount: completedSessions.length,
    averageSessionTime,
    longestSession,
    currentStreak,
  }
}

export function TimeTrackingProvider({ children }: { children: React.ReactNode }) {
  const [stats, setStats] = useState<TimeStats>(getStoredStats)
  const [currentSession, setCurrentSession] = useState<TimeSession | null>(null)
  const [isTracking, setIsTracking] = useState(false)
  const [lastActivity, setLastActivity] = useState(Date.now())

  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const idleTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Track user activity
  useEffect(() => {
    const handleActivity = () => {
      setLastActivity(Date.now())

      // Clear idle timeout and restart it
      if (idleTimeoutRef.current) {
        clearTimeout(idleTimeoutRef.current)
      }

      if (isTracking) {
        idleTimeoutRef.current = setTimeout(() => {
          // User has been idle, pause tracking
          if (currentSession && currentSession.isActive) {
            setCurrentSession((prev) => (prev ? { ...prev, isActive: false } : null))
          }
        }, IDLE_THRESHOLD)
      }
    }

    const events = ["mousedown", "mousemove", "keypress", "scroll", "touchstart", "click"]
    events.forEach((event) => {
      document.addEventListener(event, handleActivity, true)
    })

    return () => {
      events.forEach((event) => {
        document.removeEventListener(event, handleActivity, true)
      })
      if (idleTimeoutRef.current) {
        clearTimeout(idleTimeoutRef.current)
      }
    }
  }, [isTracking])

  // Update session duration every second
  useEffect(() => {
    if (isTracking && currentSession?.isActive) {
      intervalRef.current = setInterval(() => {
        setCurrentSession((prev) => {
          if (!prev || !prev.isActive) return prev

          const now = new Date()
          const duration = Math.floor((now.getTime() - prev.startTime.getTime()) / 1000)

          return { ...prev, duration }
        })
      }, 1000)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isTracking, currentSession])

  // Save session and update stats when session ends
  useEffect(() => {
    if (currentSession && !currentSession.isActive && currentSession.duration > 0) {
      const sessions = getStoredSessions()
      const updatedSession = { ...currentSession, endTime: new Date() }
      const updatedSessions = [...sessions, updatedSession]

      saveSessions(updatedSessions)

      // Recalculate stats
      const newStats = calculateTimeStats(updatedSessions)
      const updatedStats = {
        ...stats,
        ...newStats,
        lastActiveDate: new Date(),
      }

      setStats(updatedStats)
      saveStats(updatedStats)
    }
  }, [currentSession])

  const startTracking = (page: string) => {
    const session: TimeSession = {
      id: Date.now().toString(),
      startTime: new Date(),
      duration: 0,
      page,
      isActive: true,
    }

    setCurrentSession(session)
    setIsTracking(true)
    setLastActivity(Date.now())
  }

  const stopTracking = () => {
    if (currentSession) {
      setCurrentSession((prev) => (prev ? { ...prev, isActive: false } : null))
    }
    setIsTracking(false)

    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    if (idleTimeoutRef.current) {
      clearTimeout(idleTimeoutRef.current)
      idleTimeoutRef.current = null
    }
  }

  const updatePage = (page: string) => {
    if (currentSession) {
      setCurrentSession((prev) => (prev ? { ...prev, page } : null))
    }
  }

  const getTimeSpent = (format: "seconds" | "minutes" | "hours" | "formatted" = "formatted") => {
    const totalSeconds = currentSession?.duration || 0

    switch (format) {
      case "seconds":
        return totalSeconds
      case "minutes":
        return Math.floor(totalSeconds / 60)
      case "hours":
        return Math.floor(totalSeconds / 3600)
      case "formatted":
      default:
        return formatTime(totalSeconds)
    }
  }

  const resetStats = () => {
    const emptyStats: TimeStats = {
      totalTime: 0,
      todayTime: 0,
      weekTime: 0,
      monthTime: 0,
      sessionsCount: 0,
      averageSessionTime: 0,
      longestSession: 0,
      currentStreak: 0,
      lastActiveDate: null,
    }

    setStats(emptyStats)
    saveStats(emptyStats)
    localStorage.removeItem(SESSIONS_STORAGE_KEY)
  }

  // Auto-start tracking when component mounts
  useEffect(() => {
    if (typeof window !== "undefined") {
      startTracking(window.location.pathname)
    }

    return () => {
      stopTracking()
    }
  }, [])

  // Update page when route changes
  useEffect(() => {
    const handleRouteChange = () => {
      updatePage(window.location.pathname)
    }

    window.addEventListener("popstate", handleRouteChange)
    return () => window.removeEventListener("popstate", handleRouteChange)
  }, [])

  const value: TimeTrackingContextType = {
    stats,
    currentSession,
    isTracking,
    startTracking,
    stopTracking,
    updatePage,
    getTimeSpent,
    resetStats,
  }

  return <TimeTrackingContext.Provider value={value}>{children}</TimeTrackingContext.Provider>
}

// Helper function to format time for display
export function formatTimeDisplay(seconds: number): string {
  return formatTime(seconds)
}

// Helper function to get time stats for display
export function getTimeStatsDisplay(stats: TimeStats) {
  return {
    total: formatTime(stats.totalTime),
    today: formatTime(stats.todayTime),
    week: formatTime(stats.weekTime),
    month: formatTime(stats.monthTime),
    average: formatTime(stats.averageSessionTime),
    longest: formatTime(stats.longestSession),
    sessions: stats.sessionsCount,
    streak: stats.currentStreak,
  }
}
