"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Circle, Play, BookOpen, Brain } from "lucide-react"
import type { ModuleProgress } from "@/contexts/progress-context"
import { cn } from "@/lib/utils"

interface ModuleProgressCardProps {
  moduleId: string
  title: string
  description: string
  progress: ModuleProgress | null
  isUnlocked: boolean
  isQuizUnlocked: boolean
  onVideoClick?: () => void
  onDocumentationClick?: () => void
  onQuizClick?: () => void
}

export function ModuleProgressCard({
  moduleId,
  title,
  description,
  progress,
  isUnlocked,
  isQuizUnlocked,
  onVideoClick,
  onDocumentationClick,
  onQuizClick,
}: ModuleProgressCardProps) {
  const completionItems = [
    {
      label: "Video",
      completed: progress?.videoWatched || false,
      icon: Play,
      onClick: onVideoClick,
      disabled: !isUnlocked,
    },
    {
      label: "Documentation",
      completed: progress?.documentationRead || false,
      icon: BookOpen,
      onClick: onDocumentationClick,
      disabled: !isUnlocked,
    },
    {
      label: "Quiz",
      completed: progress?.quizCompleted || false,
      icon: Brain,
      onClick: onQuizClick,
      disabled: !isQuizUnlocked,
      score: progress?.quizScore,
    },
  ]

  const completedCount = completionItems.filter((item) => item.completed).length
  const progressPercentage = (completedCount / completionItems.length) * 100

  return (
    <Card
      className={cn(
        "transition-all duration-200",
        isUnlocked ? "hover:shadow-md" : "opacity-60",
        progress?.completed && "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950",
      )}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            {progress?.completed ? (
              <CheckCircle className="h-5 w-5 text-green-600" />
            ) : (
              <Circle className="h-5 w-5 text-muted-foreground" />
            )}
            {title}
          </CardTitle>
          {!isUnlocked && <Badge variant="secondary">Locked</Badge>}
          {progress?.completed && (
            <Badge variant="default" className="bg-green-600">
              Completed
            </Badge>
          )}
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Module Progress</span>
              <span className="font-medium">{Math.round(progressPercentage)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>

          {/* Completion Items */}
          <div className="grid grid-cols-3 gap-2">
            {completionItems.map((item, index) => {
              const Icon = item.icon
              return (
                <button
                  key={index}
                  onClick={item.onClick}
                  disabled={item.disabled}
                  className={cn(
                    "flex flex-col items-center gap-1 p-3 rounded-lg border transition-all duration-200",
                    item.completed
                      ? "bg-green-50 border-green-200 text-green-700 dark:bg-green-950 dark:border-green-800 dark:text-green-300"
                      : item.disabled
                        ? "bg-gray-50 border-gray-200 text-gray-400 cursor-not-allowed dark:bg-gray-900 dark:border-gray-800"
                        : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span className="text-xs font-medium">{item.label}</span>
                  {item.score !== undefined && <span className="text-xs text-muted-foreground">{item.score}%</span>}
                </button>
              )
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
