"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Shield, AlertTriangle, Target, Lock, Eye, Zap, Play, Trophy, CheckCircle, Clock } from "lucide-react"
import Link from "next/link"
import { FeatureLock } from "@/components/access-control/feature-lock"

export default function CybersecurityPage() {
  const [selectedScenario, setSelectedScenario] = useState<any>(null)
  const [simulationRunning, setSimulationRunning] = useState(false)
  const [simulationProgress, setSimulationProgress] = useState(0)

  const scenarios = [
    {
      id: 1,
      title: "Phishing Email Detection",
      description: "Learn to identify and respond to sophisticated phishing attempts targeting AI companies.",
      difficulty: "Beginner",
      duration: "15 minutes",
      participants: 2340,
      completionRate: 87,
      icon: Shield,
      status: "available",
      progress: 0,
      objectives: [
        "Identify suspicious email indicators",
        "Analyze email headers and links",
        "Report phishing attempts properly",
        "Educate team members on threats",
      ],
      scenario:
        "You receive an urgent email claiming to be from your AI model provider asking for immediate credential verification...",
    },
    {
      id: 2,
      title: "SQL Injection Attack",
      description: "Practice defending against SQL injection attacks on machine learning model databases.",
      difficulty: "Intermediate",
      duration: "25 minutes",
      participants: 1560,
      completionRate: 72,
      icon: AlertTriangle,
      status: "available",
      progress: 45,
      objectives: [
        "Identify SQL injection vulnerabilities",
        "Implement input validation",
        "Use parameterized queries",
        "Monitor database access logs",
      ],
      scenario:
        "Your ML training data database is showing unusual query patterns. Investigate potential SQL injection attempts...",
    },
    {
      id: 3,
      title: "AI Model Poisoning",
      description: "Understand and mitigate data poisoning attacks against machine learning models.",
      difficulty: "Advanced",
      duration: "35 minutes",
      participants: 890,
      completionRate: 64,
      icon: Target,
      status: "available",
      progress: 0,
      objectives: [
        "Detect poisoned training data",
        "Implement data validation pipelines",
        "Monitor model performance drift",
        "Establish data provenance tracking",
      ],
      scenario:
        "Your computer vision model's accuracy has suddenly dropped. Investigate potential data poisoning attacks...",
    },
    {
      id: 4,
      title: "Adversarial Examples",
      description: "Explore adversarial attacks on computer vision models and defense strategies.",
      difficulty: "Advanced",
      duration: "30 minutes",
      participants: 1120,
      completionRate: 58,
      icon: Eye,
      status: "available",
      progress: 0,
      objectives: [
        "Generate adversarial examples",
        "Implement adversarial training",
        "Deploy detection mechanisms",
        "Evaluate model robustness",
      ],
      scenario:
        "Your image classification model is being fooled by subtly modified images. Learn to defend against adversarial attacks...",
    },
    {
      id: 5,
      title: "Privacy-Preserving ML",
      description: "Learn about differential privacy and federated learning security challenges.",
      difficulty: "Expert",
      duration: "40 minutes",
      participants: 450,
      completionRate: 42,
      icon: Lock,
      status: "available",
      progress: 0,
      objectives: [
        "Implement differential privacy",
        "Secure federated learning",
        "Prevent membership inference",
        "Audit privacy guarantees",
      ],
      scenario:
        "Design a privacy-preserving machine learning system that protects sensitive user data while maintaining model utility...",
    },
    {
      id: 6,
      title: "AI Supply Chain Security",
      description: "Secure the AI development pipeline from data collection to model deployment.",
      difficulty: "Expert",
      duration: "45 minutes",
      participants: 320,
      completionRate: 38,
      icon: Zap,
      status: "available",
      progress: 0,
      objectives: [
        "Secure model artifacts",
        "Implement CI/CD security",
        "Monitor deployment pipelines",
        "Establish security checkpoints",
      ],
      scenario: "Audit and secure your entire AI development pipeline from data ingestion to model deployment...",
    },
  ]

  const achievements = [
    { name: "First Steps", description: "Complete your first scenario", earned: true },
    { name: "Defender", description: "Complete 5 scenarios", earned: true },
    { name: "Expert", description: "Complete 10 scenarios", earned: false },
    { name: "Master", description: "Complete all scenarios", earned: false },
  ]

  const startSimulation = (scenario: any) => {
    setSelectedScenario(scenario)
    setSimulationRunning(true)
    setSimulationProgress(0)

    // Simulate progress
    const interval = setInterval(() => {
      setSimulationProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setSimulationRunning(false)
          return 100
        }
        return prev + 10
      })
    }, 500)
  }

  const simulatorContent = (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Cyber Threat Simulator</h1>
        <p className="text-muted-foreground">
          Practice cybersecurity skills in safe, simulated environments focused on AI and ML security
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Scenarios Completed</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">out of 6 available</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85%</div>
            <p className="text-xs text-muted-foreground">Above average</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rank</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">#127</div>
            <p className="text-xs text-muted-foreground">Top 20% globally</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Achievements</CardTitle>
            <Badge className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2/4</div>
            <p className="text-xs text-muted-foreground">Badges earned</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Scenarios */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">Training Scenarios</h2>
            <Button variant="outline">View All Categories</Button>
          </div>

          <div className="space-y-4">
            {scenarios.map((scenario) => {
              const Icon = scenario.icon
              return (
                <Card key={scenario.id} className="group hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-start space-x-4">
                      <div className="h-12 w-12 bg-gradient-to-br from-red-100 to-orange-100 dark:from-red-900 dark:to-orange-900 rounded-lg flex items-center justify-center">
                        <Icon className="h-6 w-6 text-red-600 dark:text-red-400" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{scenario.title}</CardTitle>
                          <div className="flex items-center space-x-2">
                            <Badge
                              variant={
                                scenario.difficulty === "Beginner"
                                  ? "secondary"
                                  : scenario.difficulty === "Intermediate"
                                    ? "default"
                                    : "destructive"
                              }
                            >
                              {scenario.difficulty}
                            </Badge>
                          </div>
                        </div>
                        <CardDescription className="mt-2">{scenario.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {scenario.progress > 0 && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Progress</span>
                          <span>{scenario.progress}%</span>
                        </div>
                        <Progress value={scenario.progress} />
                      </div>
                    )}

                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>Duration: {scenario.duration}</span>
                      <span>{scenario.participants.toLocaleString()} participants</span>
                      <span>{scenario.completionRate}% completion rate</span>
                    </div>

                    <div className="flex space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className="flex-1" variant={scenario.progress > 0 ? "default" : "outline"}>
                            <Play className="mr-2 h-4 w-4" />
                            {scenario.progress > 0 ? "Continue" : "Start Scenario"}
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle className="flex items-center space-x-2">
                              <Icon className="h-5 w-5" />
                              <span>{scenario.title}</span>
                            </DialogTitle>
                            <DialogDescription>{scenario.description}</DialogDescription>
                          </DialogHeader>

                          <div className="space-y-4">
                            <div>
                              <h4 className="font-semibold mb-2">Scenario Brief:</h4>
                              <p className="text-sm text-muted-foreground">{scenario.scenario}</p>
                            </div>

                            <div>
                              <h4 className="font-semibold mb-2">Learning Objectives:</h4>
                              <ul className="space-y-1">
                                {scenario.objectives.map((objective, index) => (
                                  <li key={index} className="flex items-center space-x-2 text-sm">
                                    <CheckCircle className="h-4 w-4 text-green-500" />
                                    <span>{objective}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {simulationRunning && selectedScenario?.id === scenario.id && (
                              <div className="space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                  <span>Simulation Progress</span>
                                  <span>{simulationProgress}%</span>
                                </div>
                                <Progress value={simulationProgress} />
                                <p className="text-sm text-muted-foreground">
                                  {simulationProgress < 50
                                    ? "Analyzing threat..."
                                    : simulationProgress < 100
                                      ? "Implementing defenses..."
                                      : "Simulation complete!"}
                                </p>
                              </div>
                            )}

                            <div className="flex space-x-2">
                              <Button
                                onClick={() => startSimulation(scenario)}
                                disabled={simulationRunning}
                                className="flex-1"
                              >
                                {simulationRunning && selectedScenario?.id === scenario.id ? (
                                  <>
                                    <Clock className="mr-2 h-4 w-4 animate-spin" />
                                    Running Simulation...
                                  </>
                                ) : (
                                  <>
                                    <Play className="mr-2 h-4 w-4" />
                                    Start Interactive Simulation
                                  </>
                                )}
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Button variant="outline" size="sm">
                        Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Achievements */}
          <Card>
            <CardHeader>
              <CardTitle>Achievements</CardTitle>
              <CardDescription>Track your cybersecurity learning progress</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {achievements.map((achievement, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div
                    className={`h-8 w-8 rounded-full flex items-center justify-center ${
                      achievement.earned ? "bg-green-100 dark:bg-green-900" : "bg-slate-100 dark:bg-slate-800"
                    }`}
                  >
                    <Trophy
                      className={`h-4 w-4 ${
                        achievement.earned ? "text-green-600 dark:text-green-400" : "text-slate-400"
                      }`}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm">{achievement.name}</div>
                    <div className="text-xs text-muted-foreground">{achievement.description}</div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button asChild className="w-full justify-start">
                <Link href="/leaderboard">
                  <Trophy className="mr-2 h-4 w-4" />
                  View Leaderboard
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full justify-start bg-transparent">
                <Link href="/search">
                  <Shield className="mr-2 h-4 w-4" />
                  Security Resources
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full justify-start bg-transparent">
                <Link href="/chat">
                  <Target className="mr-2 h-4 w-4" />
                  Ask Security Expert
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Latest News */}
          <Card>
            <CardHeader>
              <CardTitle>Security News</CardTitle>
              <CardDescription>Latest AI security threats and updates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-medium text-sm">New Adversarial Attack Discovered</h4>
                <p className="text-xs text-muted-foreground">Researchers find new way to fool computer vision models</p>
                <div className="text-xs text-muted-foreground">2 hours ago</div>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-sm">AI Model Security Guidelines Updated</h4>
                <p className="text-xs text-muted-foreground">New best practices for securing ML pipelines</p>
                <div className="text-xs text-muted-foreground">1 day ago</div>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-sm">Privacy-Preserving ML Breakthrough</h4>
                <p className="text-xs text-muted-foreground">
                  New differential privacy techniques for federated learning
                </p>
                <div className="text-xs text-muted-foreground">3 days ago</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )

  return (
    <FeatureLock
      feature="cybersecurity-simulator"
      title="Cyber Threat Simulator"
      description="Complete the Cybersecurity Fundamentals course and pass the assessment to unlock advanced threat simulation scenarios."
    >
      {simulatorContent}
    </FeatureLock>
  )
}
