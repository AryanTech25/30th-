"use client"

import { useState } from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { CheckCircle, XCircle, Brain, RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils"

export interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

export interface QuizData {
  id: string
  title: string
  description: string
  questions: QuizQuestion[]
  passingScore: number
}

interface QuizComponentProps {
  quiz: QuizData
  onComplete: (score: number, passed: boolean) => void
  onRetry?: () => void
  isCompleted?: boolean
  previousScore?: number
}

export function QuizComponent({ quiz, onComplete, onRetry, isCompleted, previousScore }: QuizComponentProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<{ [key: number]: string }>({})
  const [showResults, setShowResults] = useState(false)
  const [quizStarted, setQuizStarted] = useState(false)
  const [selectedOption, setSelectedOption] = useState<string | undefined>(undefined) // Store selected answer per question index

  const handleAnswerSelect = (questionId: string, answerIndex: number) => {
    setSelectedOption(answerIndex.toString()) // Handle radio change for each question
  }

  const handleNext = () => {
    if (selectedOption !== undefined) {
      setAnswers((prev) => ({
        ...prev,
        [quiz.questions[currentQuestion].id]: Number.parseInt(selectedOption),
      }))
    }
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedOption(undefined)
    } else {
      handleSubmitQuiz()
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
      setSelectedOption(undefined)
    }
  }

  const handleSubmitQuiz = () => {
    const correctAnswers = quiz.questions.filter((question) => answers[question.id] === question.correctAnswer).length

    const score = Math.round((correctAnswers / quiz.questions.length) * 100)
    const passed = score >= quiz.passingScore

    setShowResults(true)
    onComplete(score, passed)
  }

  const handleRetry = () => {
  setCurrentQuestion(0)
  setAnswers({})
  setShowResults(false)
  setQuizStarted(false)
  setSelectedOption(undefined)
  onRetry?.()
  }

  const currentQuestionData = quiz.questions[currentQuestion]
  const isAnswered = selectedOption !== undefined
  const progress = ((currentQuestion + 1) / quiz.questions.length) * 100

  if (isCompleted && !showResults) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                {quiz.title}
              </CardTitle>
              <CardDescription>Quiz completed successfully!</CardDescription>
            </div>
            <Badge variant="default" className="bg-green-600">
              Score: {previousScore}%
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6">
            <p className="text-muted-foreground mb-4">
              You have already completed this quiz with a score of {previousScore}%.
            </p>
            <Button onClick={handleRetry} variant="outline">
              <RotateCcw className="mr-2 h-4 w-4" />
              Retake Quiz
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!quizStarted) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-blue-600" />
            {quiz.title}
          </CardTitle>
          <CardDescription>{quiz.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Questions:</span>
              <span className="font-medium">{quiz.questions.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Passing Score:</span>
              <span className="font-medium">{quiz.passingScore}%</span>
            </div>
          </div>
          <Button onClick={() => setQuizStarted(true)} className="w-full">
            Start Quiz
          </Button>
        </CardContent>
      </Card>
    )
  }

  if (showResults) {
    const correctAnswers = quiz.questions.filter((question) => answers[question.id] === question.correctAnswer).length
    const score = Math.round((correctAnswers / quiz.questions.length) * 100)
    const passed = score >= quiz.passingScore

    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                {passed ? (
                  <CheckCircle className="h-5 w-5 text-green-600" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-600" />
                )}
                Quiz Results
              </CardTitle>
              <CardDescription>
                {passed ? "Congratulations! You passed the quiz." : "You need to score higher to pass."}
              </CardDescription>
            </div>
            <Badge variant={passed ? "default" : "destructive"} className={passed ? "bg-green-600" : ""}>
              {score}%
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-green-600">{correctAnswers}</div>
              <div className="text-sm text-muted-foreground">Correct</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-red-600">{quiz.questions.length - correctAnswers}</div>
              <div className="text-sm text-muted-foreground">Incorrect</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{score}%</div>
              <div className="text-sm text-muted-foreground">Score</div>
            </div>
          </div>

          {/* Question Review */}
          <div className="space-y-4">
            <h3 className="font-semibold">Review Your Answers</h3>
            {quiz.questions.map((question, index) => {
              const userAnswer = answers[question.id]
              const isCorrect = userAnswer === question.correctAnswer
              return (
                <Card
                  key={question.id}
                  className={cn("border-l-4", isCorrect ? "border-l-green-500" : "border-l-red-500")}
                >
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2">
                      {isCorrect ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-600" />
                      )}
                      Question {index + 1}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p className="text-sm font-medium">{question.question}</p>
                    <div className="text-sm space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">Your answer:</span>
                        <span className={isCorrect ? "text-green-600" : "text-red-600"}>
                          {question.options[userAnswer]}
                        </span>
                      </div>
                      {!isCorrect && (
                        <div className="flex items-center gap-2">
                          <span className="text-muted-foreground">Correct answer:</span>
                          <span className="text-green-600">{question.options[question.correctAnswer]}</span>
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground bg-muted p-2 rounded">{question.explanation}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <div className="flex gap-2">
            <Button onClick={handleRetry} className="flex-1">
              <RotateCcw className="mr-2 h-4 w-4" />
              Retake Quiz
            </Button>
            <Button variant="outline" onClick={() => setShowResults(false)} className="flex-1">
              Close Results
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{quiz.title}</CardTitle>
            <CardDescription>
              Question {currentQuestion + 1} of {quiz.questions.length}
            </CardDescription>
          </div>
          <Badge variant="outline">{Math.round(progress)}% Complete</Badge>
        </div>
        <Progress value={progress} className="mt-2" />
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">{currentQuestionData.question}</h3>
          <RadioGroup
            value={selectedOption}
            onValueChange={(value) => handleAnswerSelect(currentQuestionData.id, Number.parseInt(value))}
          >
            {currentQuestionData.options.map((option, index) => (
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
          <Button variant="outline" onClick={handlePrevious} disabled={currentQuestion === 0}>
            Previous
          </Button>
          <Button onClick={handleNext} disabled={!isAnswered}>
            {currentQuestion === quiz.questions.length - 1 ? "Submit Quiz" : "Next"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
