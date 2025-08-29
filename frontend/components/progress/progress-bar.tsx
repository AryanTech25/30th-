import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

interface ProgressBarProps {
  value: number
  className?: string
  showLabel?: boolean
  size?: "sm" | "md" | "lg"
}

export function ProgressBar({ value, className, showLabel = true, size = "md" }: ProgressBarProps) {
  const sizeClasses = {
    sm: "h-2",
    md: "h-3",
    lg: "h-4",
  }

  return (
    <div className={cn("space-y-2", className)}>
      {showLabel && (
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Progress</span>
          <span className="font-medium">{Math.round(value)}%</span>
        </div>
      )}
      <Progress value={value} className={cn(sizeClasses[size])} />
    </div>
  )
}
