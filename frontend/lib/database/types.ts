// Global type declaration for mongoose caching
declare global {
  var mongoose: {
    conn: any
    promise: any
  }
}

// Re-export all model types for easy importing
export type { IUser } from "@/models/User"
export type { ICourse } from "@/models/Course"
export type { ILesson } from "@/models/Lesson"
export type { IProgress } from "@/models/Progress"
export type { ITool } from "@/models/Tool"
export type { ISubmission } from "@/models/Submission"
export type { ILeaderboardEntry } from "@/models/LeaderboardEntry"
export type { IHackathonResource } from "@/models/HackathonResource"

// Common query types
export interface PaginationOptions {
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: "asc" | "desc"
}

export interface FilterOptions {
  category?: string
  level?: string
  status?: string
  tags?: string[]
}
