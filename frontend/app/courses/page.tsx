"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Clock, Users, Star, Search, Filter, Award } from "lucide-react"
import Link from "next/link"
import { useProgress } from "@/contexts/progress-context"
import { AuthGuard } from "@/components/auth/auth-guard"

export default function CoursesPage() {
  const { getCourseProgress } = useProgress()
  const [searchTerm, setSearchTerm] = useState("")
  const [levelFilter, setLevelFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")

  const courses = [
    {
      id: 1,
      title: "Introduction to Machine Learning",
      instructor: "Dr. Sarah Chen",
      description: "Learn the fundamentals of machine learning with hands-on projects and real-world applications.",
      level: "Beginner",
      duration: "8 hours",
      students: 1250,
      rating: 4.6,
      reviews: 324,
      price: "Free",
      thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5I6fzFSTbX9Vf9jX8JOv4M393fOwIemPxHQ&s",
      tags: ["Machine Learning", "Python", "Scikit-learn"],
      category: "ml",
    },
    {
      id: 2,
      title: "Deep Learning with PyTorch",
      instructor: "Prof. Michael Rodriguez",
      description: "Master deep learning concepts and build neural networks using PyTorch framework.",
      level: "Intermediate",
      duration: "12 hours",
      students: 856,
      rating: 4.8,
      reviews: 198,
      price: "Free",
      thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBYdEshFCaNp19TdXebKeXTCnvO9_7oT-Gzw&s",
      tags: ["Deep Learning", "PyTorch", "Neural Networks"],
      category: "dl",
    },
    {
      id: 3,
      title: "Natural Language Processing",
      instructor: "Dr. Emily Watson",
      description: "Explore NLP techniques from text preprocessing to transformer models.",
      level: "Intermediate",
      duration: "10 hours",
      students: 642,
      rating: 4.7,
      reviews: 156,
      price: "Free",
      thumbnail: "data:image/jpeg;base64,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",
      tags: ["NLP", "Transformers", "BERT"],
      category: "nlp",
    },
    {
      id: 4,
      title: "Computer Vision Fundamentals",
      instructor: "Dr. James Liu",
      description: "Learn image processing, feature extraction, and modern CV techniques.",
      level: "Beginner",
      duration: "9 hours",
      students: 934,
      rating: 4.5,
      reviews: 267,
      price: "Free",
      thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRe6SZoVOwgjMwjnDmKMNTQ6he02CN4Jd2ZBA&s",
      tags: ["Computer Vision", "OpenCV", "CNN"],
      category: "cv",
    },
{
  "id": 5,
  "title": "Agentic AI ",
  "instructor": "Dr. Alex Thompson",
  "description": "Master the design and deployment of agentic AI systems that act autonomously, make decisions, and interact with environments intelligently.",
  "level": "Advanced",
  "duration": "15 hours",
  "students": 423,
  "rating": 4.9,
  "reviews": 89,
  "price": "Free",
  "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwtWYmM_JZekYAwlNt6jctTGZ9L0-yaveH-wu4Dg1mHnafKPjborkUregYEckBuf9ldR0&usqp=CAU",
  "tags": ["Agentic AI", "Autonomous Agents", "Decision-Making", "AI Planning"],
  "category": "agentic_ai"
},

    {
      id: 6,
      title: "AI Ethics and Responsible AI",
      instructor: "Prof. Maria Santos",
      description: "Understand ethical implications of AI and learn to build responsible AI systems.",
      level: "Beginner",
      duration: "6 hours",
      students: 789,
      rating: 4.4,
      reviews: 145,
      price: "Free",
      thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSb1_dJW9BkbOycK4Ee1Isgg1uOvgm4ogP7_7sLDus01HjFwKfJdznMWlHFL3uF-oC5zpI&usqp=CAU",
      tags: ["AI Ethics", "Responsible AI", "Bias Detection"],
      category: "ethics",
    },
    {
      id: 7,
      title: "Generative AI and Large Language Models",
      instructor: "Dr. Kevin Park",
      description: "Explore GPT, BERT, and other transformer models for text generation and understanding.",
      level: "Advanced",
      duration: "14 hours",
      students: 567,
      rating: 4.8,
      reviews: 112,
      price: "Free",
      thumbnail: "https://research.aimultiple.com/wp-content/uploads/2023/05/enterprise-genAI-1.png",
      tags: ["Generative AI", "LLMs", "GPT", "Transformers"],
      category: "nlp",
    },
    {
      id: 8,
      title: "MLOps and Model Deployment",
      instructor: "Sarah Johnson",
      description: "Learn to deploy, monitor, and maintain ML models in production environments.",
      level: "Intermediate",
      duration: "11 hours",
      students: 445,
      rating: 4.6,
      reviews: 98,
      price: "Free",
      thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIqpcCACToPp6lJy2vbo1yuq5qyI5ZTaebXUxi3D0nRObCZDrimCtG9QhUB09jnjPR-EM&usqp=CAU",
      tags: ["MLOps", "Docker", "Kubernetes", "Model Deployment"],
      category: "mlops",
    },
    {
  id: 9,
  title: "Introduction to Cybersecurity",
  instructor: "Sarah Johnson",
  description: "Understand the fundamentals of cybersecurity, key concepts, threats, and roles.",
  level: "Intermediate",
  duration: "11 hours",
  students: 445,
  rating: 4.6,
  reviews: 98,
  price:"Free",
  thumbnail: "https://onlinedegrees.sandiego.edu/wp-content/uploads/2020/01/USD-Cyber-Cybersecurity-vs-Information-Security-vs-Network-Security-_2.jpeg",
  tags: ["Cybersecurity", "Network Security", "Threats", "Protection"],
  category: "cybersecurity",
},
  ]

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchesSearch =
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

      const matchesLevel = levelFilter === "all" || course.level.toLowerCase() === levelFilter
      const matchesCategory = categoryFilter === "all" || course.category === categoryFilter

      return matchesSearch && matchesLevel && matchesCategory
    })
  }, [searchTerm, levelFilter, categoryFilter])

  return (
    <AuthGuard>
      <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">AI/ML Courses</h1>
        <p className="text-muted-foreground">Master artificial intelligence with our comprehensive course library</p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search courses..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={levelFilter} onValueChange={setLevelFilter}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Levels</SelectItem>
            <SelectItem value="beginner">Beginner</SelectItem>
            <SelectItem value="intermediate">Intermediate</SelectItem>
            <SelectItem value="advanced">Advanced</SelectItem>
          </SelectContent>
        </Select>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="ml">Machine Learning</SelectItem>
            <SelectItem value="dl">Deep Learning</SelectItem>
            <SelectItem value="nlp">NLP</SelectItem>
            <SelectItem value="cv">Computer Vision</SelectItem>
            <SelectItem value="rl">Reinforcement Learning</SelectItem>
            <SelectItem value="ethics">AI Ethics</SelectItem>
            <SelectItem value="mlops">MLOps</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          More Filters
        </Button>
      </div>

      {/* Results count */}
      <div className="mb-6">
        <p className="text-sm text-muted-foreground">
          Showing {filteredCourses.length} of {courses.length} courses
        </p>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => {
          const progress = getCourseProgress(course.id.toString())
          const isCompleted = progress?.certificateEarned || false
          const progressPercentage = progress?.overallProgress || 0

          return (
            <Card key={course.id} className="group hover:shadow-lg transition-all duration-300">
              <div className="aspect-video bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 rounded-t-lg relative overflow-hidden">
                {course.thumbnail && course.thumbnail !== "/placeholder.svg" ? (
                  <img
                    src={course.thumbnail || "/placeholder.svg"}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.style.display = "none"
                      target.nextElementSibling?.classList.remove("hidden")
                    }}
                  />
                ) : null}
                <div
                  className={`w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary/20 ${course.thumbnail && course.thumbnail !== "/placeholder.svg" ? "hidden" : ""}`}
                >
                  <div className="text-center">
                    <div className="h-16 w-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-2xl font-bold text-primary">{course.title.charAt(0)}</span>
                    </div>
                    <p className="text-sm font-medium text-primary/80">{course.title}</p>
                  </div>
                </div>
                <div className="absolute top-4 left-4">
                  <Badge variant={course.price === "Free" ? "secondary" : "default"}>{course.price}</Badge>
                </div>
                <div className="absolute top-4 right-4 flex gap-2">
                  <Badge variant="outline">{course.level}</Badge>
                  {isCompleted && (
                    <Badge variant="default" className="bg-green-600">
                      <Award className="w-3 h-3 mr-1" />
                      Completed
                    </Badge>
                  )}
                </div>
              </div>

              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors">
                    {course.title}
                  </CardTitle>
                </div>
                <CardDescription className="line-clamp-2">{course.description}</CardDescription>
                <div className="text-sm text-muted-foreground">by {course.instructor}</div>
              </CardHeader>

              <CardContent className="space-y-4">
                {progressPercentage > 0 && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Progress</span>
                      <span>{Math.round(progressPercentage)}%</span>
                    </div>
                    <Progress value={progressPercentage} />
                  </div>
                )}

                {/* Course Stats */}
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4" />
                    <span>{course.students.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span>{course.rating}</span>
                    <span>({course.reviews})</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {course.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Action Button */}
                <Button asChild className="w-full">
                  <Link href={`/courses/${course.id}`}>
                    {isCompleted ? "View Certificate" : progressPercentage > 0 ? "Continue Learning" : "Start Course"}
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* No results message */}
      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No courses found matching your criteria.</p>
          <Button
            variant="outline"
            className="mt-4 bg-transparent"
            onClick={() => {
              setSearchTerm("")
              setLevelFilter("all")
              setCategoryFilter("all")
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}

      {/* Load More */}
      {filteredCourses.length > 0 && (
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Load More Courses
          </Button>
        </div>
      )}
      </div>
    </AuthGuard>
  )
}
