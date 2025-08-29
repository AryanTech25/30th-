"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAccessControl } from "@/contexts/access-control-context"
import { Lock, BookOpen, Target, AlertTriangle } from "lucide-react"
import Link from "next/link"

interface FeatureLockProps {
  feature: string
  title: string
  description: string
  children?: React.ReactNode
}

export function FeatureLock({ feature, title, description, children }: FeatureLockProps) {
  const { hasAccess, getBlockingRequirements } = useAccessControl()

  const isAccessible = hasAccess(feature)
  const requirements = getBlockingRequirements(feature)

  if (isAccessible) {
    return <>{children}</>
  }

  return (
    <div className="space-y-6">
      {/* Locked Feature Notice */}
      <Card className="border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-orange-800 dark:text-orange-200">
            <Lock className="h-5 w-5" />
            {title} - Access Restricted
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-orange-700 dark:text-orange-300">{description}</p>

          <div className="space-y-3">
            <h4 className="font-semibold text-orange-800 dark:text-orange-200">Requirements to unlock:</h4>
            <div className="space-y-2">
              {requirements.map((requirement, index) => (
                <div key={index} className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                  <span className="text-sm text-orange-700 dark:text-orange-300">{requirement}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <Button asChild>
              <Link href="/courses">
                <BookOpen className="mr-2 h-4 w-4" />
                Browse Courses
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/dashboard">
                <Target className="mr-2 h-4 w-4" />
                View Progress
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Preview of Locked Content */}
      <div className="relative">
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-10 flex items-center justify-center">
          <div className="text-center space-y-2">
            <Lock className="h-8 w-8 text-muted-foreground mx-auto" />
            <p className="text-sm text-muted-foreground">Complete requirements to unlock</p>
            <Badge variant="outline">Feature Locked</Badge>
          </div>
        </div>
        <div className="opacity-30 pointer-events-none">{children}</div>
      </div>
    </div>
  )
}
