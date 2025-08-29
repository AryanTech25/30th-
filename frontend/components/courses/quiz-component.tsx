"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { CheckCircle, XCircle, Clock, Award } from "lucide-react"

interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

interface Quiz {
  id: number
  title: string
  description: string
  questions: Question[]
}

interface QuizComponentProps {
  quiz: Quiz
  courseId: number
  lessonId: number
}

export function QuizComponent({ quiz, courseId, lessonId }: QuizComponentProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({})
  const [showResults, setShowResults] = useState(false)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState(600) // 10 minutes
  const [selectedOption, setSelectedOption] = useState<string | undefined>(undefined)

  const handleAnswerSelect = (questionId: number, answerIndex: number) => {
  setSelectedOption(answerIndex.toString())
  }

  const handleNext = () => {
    if (selectedOption !== undefined) {
      setSelectedAnswers((prev) => ({
        ...prev,
        [quiz.questions[currentQuestion].id]: Number.parseInt(selectedOption),
      }))
    }
    if (currentQuestion < quiz.questions.length - 1) {
      const nextQuestionId = quiz.questions[currentQuestion + 1].id;
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(undefined);
    } else {
      setShowResults(true);
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      const prevQuestionId = quiz.questions[currentQuestion - 1].id;
      setCurrentQuestion(currentQuestion - 1);
      setSelectedOption(selectedAnswers[prevQuestionId] !== undefined ? selectedAnswers[prevQuestionId].toString() : undefined);
    }
  }

  const handleSubmitQuiz = async () => {
    // Calculate score
    const correctAnswers = quiz.questions.filter(
      (question, index) => selectedAnswers[question.id] === question.correctAnswer,
    ).length

    const score = (correctAnswers / quiz.questions.length) * 100

    // Submit to API
    try {
      const response = await fetch(`/api/courses/${courseId}/submit-quiz`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          lessonId,
          quizId: quiz.id,
          answers: selectedAnswers,
          score,
          timeSpent: 600 - timeRemaining,
        }),
      })

      if (response.ok) {
        setQuizCompleted(true)
      }
    } catch (error) {
      console.error("Failed to submit quiz:", error)
    }
  }

  const calculateScore = () => {
    const correctAnswers = quiz.questions.filter(
      (question) => selectedAnswers[question.id] === question.correctAnswer,
    ).length
    return (correctAnswers / quiz.questions.length) * 100
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  if (quizCompleted) {
    const score = calculateScore()
    const passed = score >= 70

    return (
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto mb-4">
              {passed ? <Award className="h-16 w-16 text-green-500" /> : <XCircle className="h-16 w-16 text-red-500" />}
            </div>
            <CardTitle className="text-2xl">{passed ? "Congratulations!" : "Quiz Complete"}</CardTitle>
            <CardDescription>
              {passed ? "You've successfully completed the quiz!" : "You can retake the quiz to improve your score."}
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <div className="text-3xl font-bold">{score.toFixed(0)}%</div>
                <div className="text-sm text-muted-foreground">Score</div>
              </div>
              <div>
                <div className="text-3xl font-bold">
                  {quiz.questions.filter((q) => selectedAnswers[q.id] === q.correctAnswer).length}
                </div>
                <div className="text-sm text-muted-foreground">Correct</div>
              </div>
              <div>
                <div className="text-3xl font-bold">{formatTime(600 - timeRemaining)}</div>
                <div className="text-sm text-muted-foreground">Time</div>
              </div>
            </div>

            <div className="flex justify-center space-x-4">
              <Button variant="outline">Review Answers</Button>
              {!passed && <Button>Retake Quiz</Button>}
              <Button asChild>
                <a href={`/courses/${courseId}`}>Continue Course</a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (showResults) {
    return (
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Quiz Results</CardTitle>
            <CardDescription>Review your answers before submitting</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {quiz.questions.map((question, index) => {
                const userAnswer = selectedAnswers[question.id]
                const isCorrect = userAnswer === question.correctAnswer

                return (
                  <div key={question.id} className="border rounded-lg p-4">
                    <div className="flex items-start space-x-2 mb-3">
                      {isCorrect ? (
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-500 mt-0.5" />
                      )}
                      <div className="flex-1">
                        <h4 className="font-medium mb-2">
                          Question {index + 1}: {question.question}
                        </h4>
                        <div className="space-y-2">
                          {question.options.map((option, optionIndex) => (
                            <div
                              key={optionIndex}
                              className={`p-2 rounded text-sm ${
                                optionIndex === question.correctAnswer
                                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                  : optionIndex === userAnswer && !isCorrect
                                    ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                                    : "bg-muted"
                              }`}
                            >
                              {option}
                            </div>
                          ))}
                        </div>
                        <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-950 rounded text-sm">
                          <strong>Explanation:</strong> {question.explanation}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="flex justify-between mt-6">
              <Button variant="outline" onClick={() => setShowResults(false)}>
                Back to Quiz
              </Button>
              <Button onClick={handleSubmitQuiz}>Submit Quiz</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const question = quiz.questions[currentQuestion]
  const progress = ((currentQuestion + 1) / quiz.questions.length) * 100

  return (
    <div className="max-w-4xl mx-auto">
      {/* Quiz Header */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{quiz.title}</CardTitle>
              <CardDescription>{quiz.description}</CardDescription>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1 text-sm">
                <Clock className="h-4 w-4" />
                <span>{formatTime(timeRemaining)}</span>
              </div>
              <Badge variant="outline">
                {currentQuestion + 1} of {quiz.questions.length}
              </Badge>
            </div>
          </div>
          <Progress value={progress} className="mt-4" />
        </CardHeader>
      </Card>

      {/* Question */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Question {currentQuestion + 1}</CardTitle>
          <CardDescription className="text-base">{question.question}</CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={selectedOption}
            onValueChange={(value) => handleAnswerSelect(question.id, Number.parseInt(value))}
          >
            {question.options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-muted/50">
                <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>

          <div className="flex justify-between mt-6">
            <Button variant="outline" onClick={handlePrevious} disabled={currentQuestion === 0}>
              Previous
            </Button>
            <Button onClick={handleNext} disabled={selectedOption === undefined}>
              {currentQuestion === quiz.questions.length - 1 ? "Review Answers" : "Next"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
