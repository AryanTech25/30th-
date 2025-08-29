"use client"

import type React from "react"
import { createContext, useContext } from "react"
import { useProgress } from "./progress-context"
import { useData } from "./data-context"

interface AccessRule {
  feature: string
  requiredCourses: string[]
  requiredModules?: { courseId: string; moduleId: string }[]
  requiredAssessments?: string[]
  minimumScore?: number
}

interface AccessControlContextType {
  hasAccess: (feature: string) => boolean
  getAccessRequirements: (feature: string) => AccessRule | null
  getBlockingRequirements: (feature: string) => string[]
}

const AccessControlContext = createContext<AccessControlContextType | undefined>(undefined)

export function useAccessControl() {
  const context = useContext(AccessControlContext)
  if (context === undefined) {
    throw new Error("useAccessControl must be used within an AccessControlProvider")
  }
  return context
}

// Define access rules for different features
const ACCESS_RULES: AccessRule[] = [
  {
    feature: "cybersecurity-simulator",
    requiredCourses: ["cybersecurity-basics"],
    requiredAssessments: ["cybersecurity-basics"],
    minimumScore: 50,
  },
  {
    feature: "advanced-ai-tools",
    requiredCourses: ["ml-fundamentals"],
    requiredAssessments: ["ml-fundamentals"],
    minimumScore: 70,
  },
  {
    feature: "career-mentorship",
    requiredCourses: ["ml-fundamentals", "cybersecurity-basics"],
    minimumScore: 60,
  },
  {
    feature: "practice-labs",
    requiredCourses: [],
    requiredModules: [
      { courseId: "ml-fundamentals", moduleId: "intro-ml" },
      { courseId: "cybersecurity-basics", moduleId: "cyber-intro" },
    ],
  },
]

export function AccessControlProvider({ children }: { children: React.ReactNode }) {
  const { progress } = useProgress()
  const { courses } = useData()

  const hasAccess = (feature: string): boolean => {
    const rule = ACCESS_RULES.find((r) => r.feature === feature)
    if (!rule) return true // No restrictions if no rule defined

    // Check required courses completion
    if (rule.requiredCourses) {
      for (const courseId of rule.requiredCourses) {
        const courseProgress = progress.courses[courseId]
        if (!courseProgress) return false

        // Check if course is completed
        if (!courseProgress.completedAt) return false

        // Check assessment requirements
        if (rule.requiredAssessments?.includes(courseId)) {
          if (!courseProgress.assessment.passed) return false
          if (rule.minimumScore && (courseProgress.assessment.score || 0) < rule.minimumScore) {
            return false
          }
        }
      }
    }

    // Check required modules completion
    if (rule.requiredModules) {
      for (const { courseId, moduleId } of rule.requiredModules) {
        const moduleProgress = progress.courses[courseId]?.modules[moduleId]
        if (!moduleProgress?.completed) return false
      }
    }

    return true
  }

  const getAccessRequirements = (feature: string): AccessRule | null => {
    return ACCESS_RULES.find((r) => r.feature === feature) || null
  }

  const getBlockingRequirements = (feature: string): string[] => {
    const rule = ACCESS_RULES.find((r) => r.feature === feature)
    if (!rule) return []

    const blocking: string[] = []

    // Check required courses
    if (rule.requiredCourses) {
      for (const courseId of rule.requiredCourses) {
        const course = courses.find((c) => c.id === courseId)
        const courseProgress = progress.courses[courseId]

        if (!courseProgress) {
          blocking.push(`Start the "${course?.title || courseId}" course`)
          continue
        }

        if (!courseProgress.completedAt) {
          blocking.push(`Complete the "${course?.title || courseId}" course`)
          continue
        }

        // Check assessment requirements
        if (rule.requiredAssessments?.includes(courseId)) {
          if (!courseProgress.assessment.completed) {
            blocking.push(`Complete the "${course?.title || courseId}" course assessment`)
          } else if (!courseProgress.assessment.passed) {
            blocking.push(
              `Pass the "${course?.title || courseId}" course assessment with at least ${rule.minimumScore || 50}%`,
            )
          } else if (rule.minimumScore && (courseProgress.assessment.score || 0) < rule.minimumScore) {
            blocking.push(`Achieve at least ${rule.minimumScore}% in the "${course?.title || courseId}" assessment`)
          }
        }
      }
    }

    // Check required modules
    if (rule.requiredModules) {
      for (const { courseId, moduleId } of rule.requiredModules) {
        const course = courses.find((c) => c.id === courseId)
        const module = course?.modules.find((m) => m.id === moduleId)
        const moduleProgress = progress.courses[courseId]?.modules[moduleId]

        if (!moduleProgress?.completed) {
          blocking.push(`Complete "${module?.title || moduleId}" in "${course?.title || courseId}"`)
        }
      }
    }

    return blocking
  }

  const value: AccessControlContextType = {
    hasAccess,
    getAccessRequirements,
    getBlockingRequirements,
  }

  return <AccessControlContext.Provider value={value}>{children}</AccessControlContext.Provider>
}
