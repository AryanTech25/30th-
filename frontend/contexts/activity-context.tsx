"use client"

import type React from "react"
import { createContext, useContext, useEffect, useMemo, useState } from "react"

export interface ActivityStats {
  viewedCourses: string[]
  viewedTools: string[]
  courseViewsCount: number
  toolViewsCount: number
  lastViewedAt?: Date
}

interface ActivityContextType {
  stats: ActivityStats
  recordCourseView: (courseId: string) => void
  recordToolView: (toolId: string) => void
  resetActivity: () => void
}

const STORAGE_KEY = "aiverse-activity"

const defaultStats: ActivityStats = {
  viewedCourses: [],
  viewedTools: [],
  courseViewsCount: 0,
  toolViewsCount: 0,
}

const ActivityContext = createContext<ActivityContextType | undefined>(undefined)

function reviveDates(obj: any) {
  if (obj?.lastViewedAt) obj.lastViewedAt = new Date(obj.lastViewedAt)
  return obj
}

export function ActivityProvider({ children }: { children: React.ReactNode }) {
  const [stats, setStats] = useState<ActivityStats>(() => {
    if (typeof window === "undefined") return defaultStats
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultStats
    try {
      return reviveDates(JSON.parse(raw))
    } catch {
      return defaultStats
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stats))
  }, [stats])

  const recordCourseView = (courseId: string) => {
    setStats((prev) => {
      const already = prev.viewedCourses.includes(courseId)
      return {
        ...prev,
        viewedCourses: already ? prev.viewedCourses : [...prev.viewedCourses, courseId],
        courseViewsCount: prev.courseViewsCount + 1,
        lastViewedAt: new Date(),
      }
    })
  }

  const recordToolView = (toolId: string) => {
    setStats((prev) => {
      const already = prev.viewedTools.includes(toolId)
      return {
        ...prev,
        viewedTools: already ? prev.viewedTools : [...prev.viewedTools, toolId],
        toolViewsCount: prev.toolViewsCount + 1,
        lastViewedAt: new Date(),
      }
    })
  }

  const resetActivity = () => setStats(defaultStats)

  const value = useMemo<ActivityContextType>(() => ({ stats, recordCourseView, recordToolView, resetActivity }), [stats])

  return <ActivityContext.Provider value={value}>{children}</ActivityContext.Provider>
}

export function useActivity() {
  const ctx = useContext(ActivityContext)
  if (!ctx) throw new Error("useActivity must be used within an ActivityProvider")
  return ctx
}


