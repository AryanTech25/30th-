import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ChevronLeft, ChevronRight, Play, Volume2, Settings, Maximize, Clock, CheckCircle } from "lucide-react"
import Link from "next/link"
import { QuizComponent } from "@/components/courses/quiz-component"

export default function LessonPage({ params }: { params: { id: string; lessonId: string } }) {
  const courseId = Number.parseInt(params.id)
  const lessonId = Number.parseInt(params.lessonId)

  // Mock lesson data
  const lesson = {
    id: lessonId,
    courseId: courseId,
    title: "Linear Regression Deep Dive",
    description: "Understanding and implementing linear regression from scratch",
    duration: "75 min",
    type: "video" as const,
    videoUrl: "/placeholder-video.mp4",
    transcript: "Welcome to this lesson on linear regression...",
    completed: false,
    notes: [
      "Linear regression finds the best line through data points",
      "Cost function measures prediction errors",
      "Gradient descent optimizes the model parameters",
    ],
    resources: [
      { title: "Linear Regression Cheat Sheet", url: "/resources/linear-regression.pdf" },
      { title: "Python Implementation", url: "/resources/linear-regression.py" },
      { title: "Dataset for Practice", url: "/resources/housing-data.csv" },
    ],
  }

  const course = {
    id: courseId,
    title: "Introduction to Machine Learning",
    totalLessons: 8,
    currentLesson: lessonId,
  }

  // Mock quiz data for quiz lessons
  const quizData = {
    id: 1,
    title: "Model Evaluation Quiz",
    description: "Test your understanding of evaluation metrics",
    questions: [
      {
        id: 1,
        question: "What does accuracy measure in classification?",
        options: [
          "The proportion of correct predictions",
          "The proportion of positive predictions that are correct",
          "The proportion of actual positives that are correctly identified",
          "The harmonic mean of precision and recall",
        ],
        correctAnswer: 0,
        explanation: "Accuracy measures the proportion of correct predictions out of all predictions made.",
      },
      {
        id: 2,
        question: "Which metric is best for imbalanced datasets?",
        options: ["Accuracy", "F1-score", "Mean Squared Error", "R-squared"],
        correctAnswer: 1,
        explanation: "F1-score is the harmonic mean of precision and recall, making it ideal for imbalanced datasets.",
      },
    ],
  }

  if (lesson.type === "quiz") {
    return (
      <div className="container mx-auto px-4 py-8">
        {/* Navigation */}
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" asChild>
            <Link href={`/courses/${courseId}`}>
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to Course
            </Link>
          </Button>
          <div className="text-sm text-muted-foreground">
            Lesson {lessonId} of {course.totalLessons}
          </div>
        </div>

        <QuizComponent quiz={quizData} courseId={courseId} lessonId={lessonId} />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Navigation */}
      <div className="flex items-center justify-between mb-6">
        <Button variant="ghost" asChild>
          <Link href={`/courses/${courseId}`}>
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Course
          </Link>
        </Button>
        <div className="text-sm text-muted-foreground">
          Lesson {lessonId} of {course.totalLessons}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Lesson Header */}
          <div className="mb-6">
            <Badge variant="outline" className="mb-2">
              {lesson.type}
            </Badge>
            <h1 className="text-2xl font-bold mb-2">{lesson.title}</h1>
            <p className="text-muted-foreground mb-4">{lesson.description}</p>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>{lesson.duration}</span>
              </div>
              {lesson.completed && (
                <div className="flex items-center space-x-1 text-green-600">
                  <CheckCircle className="h-4 w-4" />
                  <span>Completed</span>
                </div>
              )}
            </div>
          </div>

          {/* Video Player */}
          <Card className="mb-6">
            <CardContent className="p-0">
              <div className="aspect-video bg-black rounded-lg relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-white text-center">
                    <Play className="h-16 w-16 mx-auto mb-4" />
                    <p>Video Player Placeholder</p>
                    <p className="text-sm opacity-75">Click to play lesson video</p>
                  </div>
                </div>
                {/* Video Controls */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <div className="flex items-center space-x-4">
                    <Button size="sm" variant="ghost" className="text-white hover:text-white hover:bg-white/20">
                      <Play className="h-4 w-4" />
                    </Button>
                    <div className="flex-1">
                      <Progress value={35} className="h-1" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="ghost" className="text-white hover:text-white hover:bg-white/20">
                        <Volume2 className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="text-white hover:text-white hover:bg-white/20">
                        <Settings className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="text-white hover:text-white hover:bg-white/20">
                        <Maximize className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Lesson Navigation */}
          <div className="flex items-center justify-between">
            <Button variant="outline" disabled={lessonId <= 1}>
              <ChevronLeft className="mr-2 h-4 w-4" />
              Previous Lesson
            </Button>
            <Button>
              Next Lesson
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="space-y-6">
            {/* Key Notes */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Key Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {lesson.notes.map((note, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <div className="h-2 w-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span className="text-sm">{note}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Resources */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {lesson.resources.map((resource, index) => (
                    <Button key={index} variant="ghost" className="w-full justify-start h-auto p-2" asChild>
                      <a href={resource.url} target="_blank" rel="noopener noreferrer">
                        <div className="text-left">
                          <div className="font-medium text-sm">{resource.title}</div>
                        </div>
                      </a>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Course Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Overall Progress</span>
                    <span>35%</span>
                  </div>
                  <Progress value={35} />
                  <p className="text-xs text-muted-foreground">3 of 8 lessons completed</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
