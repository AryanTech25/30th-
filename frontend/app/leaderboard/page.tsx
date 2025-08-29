"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useData } from "@/contexts/data-context"
import { Trophy, Medal, Award, TrendingUp, TrendingDown, Minus, Plus } from "lucide-react"

export default function LeaderboardPage() {
  const { getLeaderboard } = useData()
  const leaderboardData = getLeaderboard()

  const benchmarks = [
    { name: "MMLU", description: "Massive Multitask Language Understanding", entries: 156 },
    { name: "HellaSwag", description: "Commonsense Natural Language Inference", entries: 89 },
    { name: "HumanEval", description: "Code Generation Benchmark", entries: 124 },
    { name: "GSM8K", description: "Grade School Math Word Problems", entries: 67 },
    { name: "TruthfulQA", description: "Truthfulness in Question Answering", entries: 45 },
  ]

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-5 w-5 text-yellow-500" />
      case 2:
        return <Medal className="h-5 w-5 text-slate-400" />
      case 3:
        return <Award className="h-5 w-5 text-amber-600" />
      default:
        return <span className="text-lg font-bold text-muted-foreground">#{rank}</span>
    }
  }

  const getRankChange = (current: number, previous: number) => {
    if (current < previous) {
      return <TrendingUp className="h-4 w-4 text-green-500" />
    } else if (current > previous) {
      return <TrendingDown className="h-4 w-4 text-red-500" />
    } else {
      return <Minus className="h-4 w-4 text-muted-foreground" />
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Model Performance Leaderboard</h1>
        <p className="text-muted-foreground">
          Compare and rank AI model performances across various benchmarks and tasks
        </p>
      </div>

      {/* Benchmark Selection */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <Select defaultValue="mmlu">
          <SelectTrigger className="w-full md:w-[300px]">
            <SelectValue placeholder="Select Benchmark" />
          </SelectTrigger>
          <SelectContent>
            {benchmarks.map((benchmark) => (
              <SelectItem key={benchmark.name.toLowerCase()} value={benchmark.name.toLowerCase()}>
                <div>
                  <div className="font-medium">{benchmark.name}</div>
                  <div className="text-xs text-muted-foreground">{benchmark.entries} entries</div>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select defaultValue="all">
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder="Model Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Models</SelectItem>
            <SelectItem value="language-model">Language Models</SelectItem>
            <SelectItem value="computer-vision">Computer Vision</SelectItem>
            <SelectItem value="multimodal">Multimodal</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline">
          <Plus className="mr-2 h-4 w-4" />
          Submit Model
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Leaderboard */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>MMLU Benchmark Results</CardTitle>
              <CardDescription>Massive Multitask Language Understanding - Updated daily</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {leaderboardData.map((entry) => (
                  <div
                    key={entry.rank}
                    className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    {/* Rank */}
                    <div className="flex items-center space-x-2 w-16">
                      {getRankIcon(entry.rank)}
                      {getRankChange(entry.rank, entry.previousRank)}
                    </div>

                    {/* Model Info */}
                    <div className="flex items-center space-x-3 flex-1">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={entry.avatar || "/placeholder.svg"} alt={entry.name} />
                        <AvatarFallback>{entry.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-semibold">{entry.name}</div>
                        <div className="text-sm text-muted-foreground">{entry.organization}</div>
                      </div>
                    </div>

                    {/* Score */}
                    <div className="text-right">
                      <div className="text-2xl font-bold">{entry.score}%</div>
                      <div className="text-xs text-muted-foreground">accuracy</div>
                    </div>

                    {/* Verification */}
                    <div className="flex items-center space-x-2">
                      {entry.verified && <Badge variant="secondary">Verified</Badge>}
                      <Button variant="ghost" size="sm">
                        Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center mt-6">
                <Button variant="outline">Load More Results</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Benchmark Info */}
          <Card>
            <CardHeader>
              <CardTitle>Current Benchmark</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold">MMLU</h3>
                <p className="text-sm text-muted-foreground">
                  Massive Multitask Language Understanding benchmark covering 57 subjects
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Total Submissions</span>
                  <span>156</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Verified Models</span>
                  <span>89</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Last Updated</span>
                  <span>2 hours ago</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Top Performers */}
          <Card>
            <CardHeader>
              <CardTitle>Top Performers</CardTitle>
              <CardDescription>Across all benchmarks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Trophy className="h-4 w-4 text-yellow-500" />
                  <div className="flex-1">
                    <div className="font-medium text-sm">OpenAI</div>
                    <div className="text-xs text-muted-foreground">12 #1 rankings</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Medal className="h-4 w-4 text-slate-400" />
                  <div className="flex-1">
                    <div className="font-medium text-sm">Anthropic</div>
                    <div className="text-xs text-muted-foreground">8 #1 rankings</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Award className="h-4 w-4 text-amber-600" />
                  <div className="flex-1">
                    <div className="font-medium text-sm">Google</div>
                    <div className="text-xs text-muted-foreground">6 #1 rankings</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submit Model */}
          <Card>
            <CardHeader>
              <CardTitle>Submit Your Model</CardTitle>
              <CardDescription>Add your model to the leaderboard</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Submit your model's performance results and compete with the best AI models globally.
              </p>
              <Button className="w-full">
                <Plus className="mr-2 h-4 w-4" />
                Submit Model
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
