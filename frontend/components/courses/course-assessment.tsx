"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { useProgress } from "@/contexts/progress-context"
import { CheckCircle, XCircle, Trophy, AlertTriangle, Clock, Target, Award } from "lucide-react"
import Link from "next/link"

interface AssessmentQuestion {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

interface CourseAssessmentProps {
  courseId: string
  questions: AssessmentQuestion[]
}

export function CourseAssessment({ courseId, questions }: CourseAssessmentProps) {
  const { getCourseProgress, completeAssessment, isAssessmentUnlocked } = useProgress()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [showResults, setShowResults] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const courseProgress = getCourseProgress(courseId)
  const assessment = courseProgress?.assessment
  const isUnlocked = isAssessmentUnlocked(courseId)

  const handleAnswerChange = (questionId: string, answerIndex: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answerIndex }))
  }

  const calculateScore = () => {
    let correct = 0
    questions.forEach((question) => {
      if (answers[question.id] === question.correctAnswer) {
        correct++
      }
    })
    return Math.round((correct / questions.length) * 100)
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const score = calculateScore()
    completeAssessment(courseId, score)
    setShowResults(true)
    setIsSubmitting(false)
  }

  const resetAssessment = () => {
    setCurrentQuestion(0)
    setAnswers({})
    setShowResults(false)
  }

  if (!isUnlocked) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Course Assessment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Assessment Locked</h3>
            <p className="text-muted-foreground mb-4">Complete all course modules to unlock the final assessment.</p>
            <Badge variant="outline">Complete all modules first</Badge>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (assessment?.completed && showResults) {
    const score = assessment.score || 0
    const passed = score >= 50

    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Assessment Results
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            {passed ? (
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            ) : (
              <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            )}

            <h3 className="text-2xl font-bold mb-2">{passed ? "Congratulations!" : "Assessment Not Passed"}</h3>

            <div className="text-4xl font-bold mb-2 text-primary">{score}%</div>

            <p className="text-muted-foreground mb-4">
              {passed
                ? "You've successfully completed the course assessment!"
                : "You need at least 50% to pass. You can retake the assessment."}
            </p>

            <div className="flex items-center justify-center gap-4 mb-6">
              <Badge variant={passed ? "default" : "destructive"}>{passed ? "Passed" : "Failed"}</Badge>
              <Badge variant="outline">
                Attempt {assessment.attempts} of {assessment.maxAttempts}
              </Badge>
            </div>

            {passed && (
              <div className="p-6 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950 rounded-lg border border-green-200 dark:border-green-800">
                <div className="text-center space-y-4">
                  <Trophy className="h-12 w-12 text-green-600 mx-auto" />
                  <div>
                    <h3 className="text-lg font-semibold text-green-700 dark:text-green-300 mb-2">
                      🎉 Certificate Unlocked!
                    </h3>
                    <p className="text-sm text-green-600 dark:text-green-400 mb-4">
                      Congratulations! You've successfully completed the course assessment and earned your certificate.
                    </p>
                    <Button asChild className="bg-green-600 hover:bg-green-700">
                      <Link href={`/courses/${courseId}/certificate`}>
                        <Award className="mr-2 h-4 w-4" />
                        Claim Your Certificate
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Question Review:</h4>
            {questions.map((question, index) => {
              const userAnswer = answers[question.id]
              const isCorrect = userAnswer === question.correctAnswer

              return (
                <div key={question.id} className="p-4 border rounded-lg">
                  <div className="flex items-start gap-2 mb-2">
                    {isCorrect ? (
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <p className="font-medium mb-2">{question.question}</p>
                      <p className="text-sm text-muted-foreground mb-2">Your answer: {question.options[userAnswer]}</p>
                      {!isCorrect && (
                        <p className="text-sm text-green-600 mb-2">
                          Correct answer: {question.options[question.correctAnswer]}
                        </p>
                      )}
                      <p className="text-sm text-muted-foreground">{question.explanation}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {!passed && assessment.attempts < assessment.maxAttempts && (
            <Button onClick={resetAssessment} className="w-full">
              Retake Assessment
            </Button>
          )}
        </CardContent>
      </Card>
    )
  }

  if (showResults) {
    return null // This case is handled above
  }

  const currentQ = questions[currentQuestion]
  const progress = ((currentQuestion + 1) / questions.length) * 100

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Course Assessment
          </div>
          <Badge variant="outline">
            {currentQuestion + 1} of {questions.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} />
        </div>

        {assessment && typeof assessment.attempts === "number" && assessment.attempts > 0 && (
          <div className="p-3 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground">
              Previous attempt: {assessment.score}%{assessment.passed ? " (Passed)" : " (Failed)"}
            </p>
          </div>
        )}

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">{currentQ.question}</h3>

          <RadioGroup
            value={answers[currentQ.id]?.toString()}
            onValueChange={(value) => handleAnswerChange(currentQ.id, Number.parseInt(value))}
          >
            {currentQ.options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
            disabled={currentQuestion === 0}
          >
            Previous
          </Button>

          {currentQuestion === questions.length - 1 ? (
            <Button onClick={handleSubmit} disabled={Object.keys(answers).length !== questions.length || isSubmitting}>
              {isSubmitting ? (
                <>
                  <Clock className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Assessment"
              )}
            </Button>
          ) : (
            <Button
              onClick={() => setCurrentQuestion(currentQuestion + 1)}
              disabled={answers[currentQ.id] === undefined}
            >
              Next
            </Button>
          )}
        </div>

        <div className="text-center text-sm text-muted-foreground">
          <p>You need at least 50% to pass and unlock your certificate.</p>
          <p>You have {assessment?.maxAttempts || 3} attempts total.</p>
        </div>
      </CardContent>
    </Card>
  )
}
