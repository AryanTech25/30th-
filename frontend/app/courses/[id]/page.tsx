"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useProgress } from "@/contexts/progress-context"
import { useWishlist } from "@/contexts/wishlist-context"
import { Clock, Users, Star, CheckCircle, BookOpen, Award, Target, Download, Code, Trophy, Heart } from "lucide-react"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useActivity } from "@/contexts/activity-context"

const courseData = {
  "1": {
    id: 1,
    title: "Machine Learning Fundamentals",
    instructor: "Dr. Sarah Chen",
    description:
      "Master machine learning technologies including GPT, DALL-E, and other cutting-edge models. Learn to build and deploy generative AI applications.",
    level: "Intermediate",
    duration: "12 hours",
    students: 2150,
    rating: 4.8,
    reviews: 456,
    price: "Free",
    thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5I6fzFSTbX9Vf9jX8JOv4M393fOwIemPxHQ&s",
    tags: ["Machine Learning", "GPT", "DALL-E", "LLMs"],
    instructorBio: "Dr. Sarah Chen is a leading researcher in machine learning with 8+ years at OpenAI and Google.",
    instructorAvatar: "/placeholder.svg?height=100&width=100",
    learningObjectives: [
      "Understand machine learning architectures and principles",
      "Build applications using GPT and other LLMs",
      "Create image generation systems with DALL-E",
      "Deploy machine learning models in production",
    ],
    prerequisites: ["Python programming", "Basic machine learning concepts"],
    certificate: true,
    modules: [
      { id: "module-1", title: "Introduction to Machine Learning", description: "Understanding the fundamentals of machine learning models and their applications" },
      { id: "module-2", title: "Large Language Models", description: "Deep dive into GPT, BERT, and transformer architectures" },
      { id: "practice-labs", title: "Practice Labs", description: "Hands-on coding exercises with Python compiler for machine learning projects" }
    ]
  },
  "2": {
    id: 2,
    title: "Agentic AI Systems",
    instructor: "Prof. Michael Rodriguez",
    description: "Learn to build autonomous AI agents that can reason, plan, and take actions in complex environments.",
    level: "Advanced",
    duration: "15 hours",
    students: 1340,
    rating: 4.9,
    reviews: 287,
    price: "Free",
    thumbnail: "/placeholder.svg?height=400&width=600",
    tags: ["Agentic AI", "Autonomous Agents", "Multi-Agent Systems", "Reasoning"],
    instructorBio: "Prof. Rodriguez specializes in autonomous systems and has published 50+ papers on AI agents.",
    instructorAvatar: "/placeholder.svg?height=100&width=100",
    learningObjectives: [
      "Design and implement autonomous AI agents",
      "Understand agent reasoning and planning algorithms",
      "Build multi-agent collaborative systems",
      "Deploy agents in real-world scenarios",
    ],
    prerequisites: ["Advanced Python", "Machine learning experience", "Basic reinforcement learning"],
    certificate: true,
    modules: [
      { id: "module-1", title: "Agent Architectures", description: "Fundamental concepts of AI agents and their design patterns" },
      { id: "module-2", title: "Reasoning and Planning", description: "How agents make decisions and plan actions in complex environments" },
      { id: "practice-labs", title: "Practice Labs", description: "Build and test autonomous agents with integrated Python development environment" }
    ]
  },
  "3": {
    id: 3,
    title: "Natural Language Processing",
    instructor: "Dr. Emily Watson",
    description:
      "Comprehensive natural language processing course covering supervised, unsupervised, and reinforcement learning with practical implementations.",
    level: "Beginner",
    duration: "18 hours",
    students: 3250,
    rating: 4.7,
    reviews: 892,
    price: "Free",
    thumbnail: "/placeholder.svg?height=400&width=600",
    tags: ["Natural Language Processing", "Scikit-learn", "TensorFlow", "Data Science"],
    instructorBio:
      "Dr. Watson is a data scientist with 12+ years of experience in ML research and industry applications.",
    instructorAvatar: "/placeholder.svg?height=100&width=100",
    learningObjectives: [
      "Master supervised and unsupervised learning algorithms",
      "Implement NLP models using Python and popular libraries",
      "Understand feature engineering and model evaluation",
      "Deploy NLP models in production environments",
    ],
    prerequisites: ["Basic Python programming", "High school mathematics"],
    certificate: true,
    modules: [
      { id: "module-1", title: "NLP Fundamentals", description: "Introduction to natural language processing concepts and methodologies" },
      { id: "module-2", title: "Supervised Learning", description: "Classification and regression algorithms with practical examples" },
      { id: "practice-labs", title: "Practice Labs", description: "Hands-on NLP projects with Jupyter-style Python compiler and data analysis tools" }
    ]
  },
  "4": {
    id: 4,
    title: "Computer Vision Fundamentals",
    instructor: "Dr. James Liu",
    description:
      "Learn essential computer vision concepts, threat analysis, and protection strategies for modern digital environments.",
    level: "Intermediate",
    duration: "14 hours",
    students: 1890,
    rating: 4.6,
    reviews: 534,
    price: "Free",
    thumbnail: "/placeholder.svg?height=400&width=600",
    tags: ["Computer Vision", "Network Security", "Threat Analysis", "Penetration Testing"],
    instructorBio: "Dr. Liu is a computer vision expert with 15+ years in both defensive and offensive security.",
    instructorAvatar: "/placeholder.svg?height=100&width=100",
    learningObjectives: [
      "Understand common computer vision threats and vulnerabilities",
      "Implement security measures and best practices",
      "Perform basic penetration testing and vulnerability assessment",
      "Develop incident response and recovery strategies",
    ],
    prerequisites: ["Basic networking knowledge", "Command line familiarity"],
    certificate: true,
    modules: [
      { id: "module-1", title: "Computer Vision Fundamentals", description: "Core computer vision concepts and threat landscape overview" },
      { id: "module-2", title: "Computer Vision", description: "Protecting networks from attacks and implementing security controls" },
      { id: "practice-labs", title: "Practice Labs", description: "Hands-on computer vision exercises with Python scripting and penetration testing tools" }
    ]
  },
  "5": {
    id: 5,
    title: "Agentic AI Mastery",
    instructor: "Dr. Rajiv Kumar",
    description: "Master agentic AI techniques to design autonomous agents that perceive, plan, and act intelligently in complex environments.",
    level: "Advanced",
    duration: "18 hours",
    students: 1420,
    rating: 4.9,
    reviews: 372,
    price: "Free",
    thumbnail: "/placeholder.svg?height=400&width=600",
    tags: ["Agentic AI", "Autonomous Agents", "Decision-Making", "Planning", "Multi-Agent Systems"],
    instructorBio: "Dr. Rajiv Kumar is an expert in agentic AI with 9+ years of experience designing autonomous systems for robotics, simulation, and real-world AI applications.",
    instructorAvatar: "/placeholder.svg?height=100&width=100",
    learningObjectives: [
      "Understand agentic AI principles and autonomous agent design",
      "Implement decision-making and planning algorithms for agents",
      "Build and train autonomous agents in simulation and real-world environments",
      "Coordinate multi-agent systems to solve complex tasks"
    ],
    prerequisites: ["Python programming", "Linear algebra", "Probability and statistics", "Basic machine learning"],
    certificate: true,
    modules: [
      { id: "module-1", title: "Introduction to Agentic AI", description: "Learn the fundamentals of agentic AI, agent architectures, and agent-environment interaction" },
      { id: "module-2", title: "Value-Based and Planning Methods", description: "Deep dive into value-based methods, decision-making algorithms, and planning strategies for autonomous agents" },
      { id: "module-3", title: "Policy-Based and Multi-Agent Methods", description: "Learn policy gradients, actor-critic methods, and strategies for coordinating multiple autonomous agents" },
      { id: "module-4", title: "Deep Agentic AI", description: "Implement deep neural networks for autonomous agents and advanced planning strategies" },
      { id: "practice-labs", title: "Practice Labs", description: "Train and evaluate agentic AI systems in simulated and real environments" }
    ]
  },
  "6": {
    id: 6,
    title: "AI Ethics and Responsible AI",
    instructor: "Dr. Ananya Singh",
    description: "Explore ethical challenges in AI development and deployment. Learn to build responsible AI systems that prioritize fairness, transparency, and accountability.",
    level: "Intermediate",
    duration: "10 hours",
    students: 980,
    rating: 4.7,
    reviews: 214,
    price: "Free",
    thumbnail: "/placeholder.svg?height=400&width=600",
    tags: ["AI Ethics", "Responsible AI", "Fairness", "Bias Mitigation", "Transparency"],
    instructorBio: "Dr. Ananya Singh is an AI researcher and ethicist with 8+ years of experience advising AI projects in academia and industry.",
    instructorAvatar: "/placeholder.svg?height=100&width=100",
    learningObjectives: [
      "Understand ethical challenges in AI and their societal impact",
      "Identify and mitigate biases in AI models",
      "Design AI systems with transparency, accountability, and fairness"
    ],
    prerequisites: ["Basic AI and machine learning knowledge", "Python programming (optional for case studies)"],
    certificate: true,
    modules: [
      { id: "module-1", title: "Introduction to AI Ethics", description: "Learn the foundational concepts of AI ethics, including fairness, transparency, and accountability" },
      { id: "module-2", title: "Bias and Fairness in AI", description: "Deep dive into detecting, measuring, and mitigating bias in AI systems" },
      { id: "module-3", title: "Responsible AI Practices", description: "Best practices for building and deploying AI responsibly, including governance and explainability" }
    ]
  },
  "7": {
    id: 7,
    title: "Generative AI Fundamentals",
    instructor: "Dr. Sarah Chen",
    description: "Master generative AI technologies including GPT, DALL-E, and other cutting-edge models. Learn to build and deploy generative AI applications.",
    level: "Intermediate",
    duration: "12 hours",
    students: 2150,
    rating: 4.8,
    reviews: 456,
    price: "Free",
    thumbnail: "/placeholder.svg?height=400&width=600",
    tags: ["Generative AI", "GPT", "DALL-E", "LLMs"],
    instructorBio: "Dr. Sarah Chen is a leading researcher in generative AI with 8+ years at OpenAI and Google.",
    instructorAvatar: "/placeholder.svg?height=100&width=100",
    learningObjectives: [
      "Understand generative AI architectures and principles",
      "Build applications using GPT and other LLMs",
      "Create image generation systems with DALL-E",
      "Deploy generative AI models in production",
    ],
    prerequisites: ["Python programming", "Basic machine learning concepts"],
    certificate: true,
    modules: [
      { id: "module-1", title: "Introduction to Generative AI", description: "Understanding the fundamentals of generative models and their applications" },
      { id: "module-2", title: "Large Language Models", description: "Deep dive into GPT, BERT, and transformer architectures" },
      { id: "practice-labs", title: "Practice Labs", description: "Hands-on coding exercises with Python compiler for generative AI projects" }
    ]
  },
  "8": {
    id: 8,
    title: "MLOps and Model Deployment",
    instructor: "Dr. Arjun Mehta",
    description: "Learn how to operationalize machine learning models, automate workflows, and deploy models in production environments using modern MLOps practices.",
    level: "Intermediate",
    duration: "12 hours",
    students: 1150,
    rating: 4.8,
    reviews: 287,
    price: "Free",
    thumbnail: "/placeholder.svg?height=400&width=600",
    tags: ["MLOps", "Model Deployment", "CI/CD", "Monitoring", "Automation"],
    instructorBio: "Dr. Arjun Mehta has 8+ years of experience in ML engineering and MLOps, helping organizations scale AI solutions in production.",
    instructorAvatar: "/placeholder.svg?height=100&width=100",
    learningObjectives: [
      "Understand MLOps principles and workflows",
      "Automate model training, testing, and deployment",
      "Monitor and manage ML models in production"
    ],
    prerequisites: ["Python programming", "Machine learning basics", "Basic cloud knowledge"],
    certificate: true,
    modules: [
      { id: "module-1", title: "Introduction to MLOps", description: "Learn the fundamentals of MLOps, its importance, and key concepts for operationalizing ML models" },
      { id: "module-2", title: "Model Deployment and Serving", description: "Learn how to deploy ML models using cloud platforms, APIs, and containerized environments" },
      { id: "module-3", title: "Monitoring, Automation, and Scaling", description: "Learn to monitor deployed models, implement automation, and scale ML systems efficiently" }
    ]
  },
  "9": {
    id: 9,
    title: "Cybersecurity Fundamentals",
    instructor: "Dr. Michael Torres",
    description: "Learn essential cybersecurity concepts, tools, and practices to protect systems and data.",
    level: "Intermediate",
    duration: "14 hours",
    students: 1875,
    rating: 4.7,
    reviews: 398,
    price: "Free",
    thumbnail: "https://onlinedegrees.sandiego.edu/wp-content/uploads/2020/01/USD-Cyber-Cybersecurity-vs-Information-Security-vs-Network-Security-_2.jpeg",
    tags: ["Cybersecurity", "Ethical Hacking", "Network Security", "Threat Analysis"],
    instructorBio: "Dr. Michael Torres has 10+ years of experience in cybersecurity research and practice.",
    instructorAvatar: "/placeholder.svg?height=100&width=100",
    learningObjectives: [
      "Understand core cybersecurity principles and frameworks",
      "Identify and mitigate security threats and vulnerabilities",
      "Perform ethical hacking and penetration testing",
      "Implement network and application security measures"
    ],
    prerequisites: ["Basic networking knowledge", "Familiarity with operating systems"],
    certificate: true,
    modules: [
      { id: "module-1", title: "Introduction to Cybersecurity", description: "Learn the fundamentals of cybersecurity, key concepts, and its importance in modern IT environments" },
      { id: "module-2", title: "Lecture 0 - Securing Accounts", description: "Dive into network security protocols, firewall configurations, and securing operating systems" },
      { id: "module-3", title: "Lecture 1 - Securing Data", description: "Dive into network security protocols, firewall configurations, and securing operating systems" },
      { id: "module-4", title: "Lecture 2 - Securing Systems", description: "Dive into network security protocols, firewall configurations, and securing operating systems" },
      { id: "module-5", title: "Lecture 3 - Securing Software", description: "Dive into network security protocols, firewall configurations, and securing operating systems" },
      { id: "module-6", title: "Lecture 4 - Preserving Privacy", description: "Dive into network security protocols, firewall configurations, and securing operating systems" },
      { id: "practice-labs", title: "Practice Labs", description: "Practical exercises to apply cybersecurity skills using virtual labs and tools" }
    ]
  }
}


export default function CourseDetailPage() {
  const params = useParams()
  const courseId = params.id as string
  const course = courseData[courseId as keyof typeof courseData]

  const { getCourseProgress, getModuleProgress, isModuleUnlocked, isQuizUnlocked, startCourse, isCertificateEligible } =
    useProgress()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [completionOpen, setCompletionOpen] = useState(false)
  const router = useRouter()
  const { recordCourseView } = useActivity()

  const courseProgress = getCourseProgress(courseId)

  useEffect(() => {
    if (courseId) recordCourseView(String(courseId))
  }, [courseId])

  // Show completion popup when all required modules are completed (practice-labs excluded)
  useEffect(() => {
    if (!courseProgress) return
    const modules = Object.values(courseProgress.modules || {})
    const required = modules.filter((m) => m.id !== "practice-labs")
    if (required.length > 0 && required.every((m) => m.completed)) {
      setCompletionOpen(true)
    }
  }, [courseProgress])

  if (!course) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Course Not Found</h1>
          <Button asChild>
            <Link href="/courses">Back to Courses</Link>
          </Button>
        </div>
      </div>
    )
  }

  const handleStartCourse = () => {
    startCourse(courseId)
  }

  const handleWishlistToggle = () => {
    if (isInWishlist(courseId)) {
      removeFromWishlist(courseId)
    } else {
      addToWishlist({
        itemType: 'course',
        id: courseId,
        title: course.title,
        instructor: course.instructor,
        description: course.description,
        level: course.level,
        duration: course.duration,
        students: course.students,
        rating: course.rating,
        reviews: course.reviews,
        price: course.price,
        thumbnail: course.thumbnail,
        tags: course.tags,
        instructorAvatar: course.instructorAvatar
      })
      setConfirmOpen(true)
    }
  }

  const isEnrolled = !!courseProgress
  const isCompleted = courseProgress?.certificateEarned
  const overallProgress = courseProgress?.overallProgress || 0
  const certificateEligible = isCertificateEligible(courseId)
  const assessmentPassed = courseProgress?.assessment?.passed || false

  return (
    <div className="container mx-auto px-4 py-8">
      {certificateEligible && !isCompleted && (
        <div className="mb-6 p-6 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950 rounded-lg border border-green-200 dark:border-green-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Trophy className="h-12 w-12 text-green-600" />
              <div>
                <h3 className="text-lg font-semibold text-green-700 dark:text-green-300">
                  🎉 Congratulations! Certificate Ready
                </h3>
                <p className="text-green-600 dark:text-green-400">
                  You've passed the assessment and earned your certificate. Claim it now!
                </p>
              </div>
            </div>
            <Button asChild className="bg-green-600 hover:bg-green-700">
              <Link href={`/courses/${courseId}/certificate`}>
                <Award className="mr-2 h-4 w-4" />
                Claim Certificate
              </Link>
            </Button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2">
          <div className="mb-4">
            <Badge variant="outline" className="mb-2">
              {course.level}
            </Badge>
            <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
            <p className="text-lg text-muted-foreground mb-4">{course.description}</p>
          </div>

          <div className="flex items-center space-x-4 mb-6">
            <Avatar className="h-12 w-12">
              <AvatarImage src={course.instructorAvatar || "/placeholder.svg"} alt={course.instructor} />
              <AvatarFallback>
                {course.instructor
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">{course.instructor}</p>
              <p className="text-sm text-muted-foreground">{course.instructorBio}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-6">
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="h-4 w-4" />
              <span>{course.students.toLocaleString()} students</span>
            </div>
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span>
                {course.rating} ({course.reviews} reviews)
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <BookOpen className="h-4 w-4" />
              <span>{course.modules.length} modules</span>
            </div>
            {course.certificate && (
              <div className="flex items-center space-x-1">
                <Award className="h-4 w-4" />
                <span>Certificate included</span>
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {course.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-4">
            <CardHeader>
              <div className="aspect-video bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 rounded-lg mb-4 overflow-hidden">
                {course.thumbnail && course.thumbnail !== "/placeholder.svg" ? (
                  <img
                    src={course.thumbnail || "/placeholder.svg"}
                    alt={course.title}
                    className="w-full h-full object-cover rounded-lg"
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
              </div>
              <div className="text-2xl font-bold">{course.price}</div>
            </CardHeader>
            <CardContent className="space-y-4">
              {isEnrolled && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Progress</span>
                    <span>{Math.round(overallProgress)}%</span>
                  </div>
                  <Progress value={overallProgress} />
                  {isCompleted && (
                    <div className="flex items-center gap-2 text-sm text-green-600">
                      <CheckCircle className="h-4 w-4" />
                      <span>Course completed!</span>
                    </div>
                  )}
                </div>
              )}

              {isEnrolled ? (
                <Button className="w-full" size="lg" asChild>
                  <Link href={`/courses/${courseId}/modules/module-1`}>
                    {isCompleted ? "Review Course" : "Continue Learning"}
                  </Link>
                </Button>
              ) : (
                <Button className="w-full" size="lg" onClick={handleStartCourse}>
                  Start Course
                </Button>
              )}

              {(certificateEligible || isCompleted) && course.certificate && (
                <div className="space-y-2 p-4 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950 rounded-lg border border-green-200 dark:border-green-800">
                  <div className="text-center mb-3">
                    <Trophy className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <p className="text-sm font-medium text-green-700 dark:text-green-300">
                      {isCompleted ? "Certificate Earned!" : "Certificate Available!"}
                    </p>
                  </div>
                  <Button variant="default" className="w-full bg-green-600 hover:bg-green-700" asChild>
                    <Link href={`/courses/${courseId}/certificate`}>
                      <Award className="mr-2 h-4 w-4" />
                      {isCompleted ? "View Certificate" : "Claim Certificate"}
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent border-green-300" asChild>
                    <Link href={`/courses/${courseId}/certificate`}>
                      <Download className="mr-2 h-4 w-4" />
                      Download PDF
                    </Link>
                  </Button>
                </div>
              )}

              <Button 
                variant="outline" 
                className="w-full bg-transparent"
                onClick={handleWishlistToggle}
              >
                <Heart className={`mr-2 h-4 w-4 ${isInWishlist(courseId) ? 'fill-red-500 text-red-500' : ''}`} />
                {isInWishlist(courseId) ? 'Remove from Wishlist' : 'Add to Wishlist'}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <Tabs defaultValue="curriculum" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="instructor">Instructor</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>

        <TabsContent value="curriculum" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Course Modules</CardTitle>
              <CardDescription>
                {course.modules.length} modules • {course.duration} total length
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {course.modules.map((module, index) => {
                  const moduleProgress = getModuleProgress(courseId, module.id)
                  const isUnlocked = isModuleUnlocked(courseId, module.id)
                  const quizUnlocked = isQuizUnlocked(courseId, module.id)

                  return (
                    <div key={module.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          {module.id === "practice-labs" ? (
                            <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900">
                              <Code className="h-5 w-5 text-green-600 dark:text-green-400" />
                            </div>
                          ) : (
                            <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900">
                              <BookOpen className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                            </div>
                          )}
                          <div>
                            <h3 className="font-semibold">{module.title}</h3>
                            <p className="text-sm text-muted-foreground">{module.description}</p>
                            {module.id === "practice-labs" && (
                              <Badge variant="secondary" className="mt-1">
                                <Code className="h-3 w-3 mr-1" />
                                Interactive Coding
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {moduleProgress?.videoWatched && <CheckCircle className="h-4 w-4 text-green-600" />}
                          <Button
                            variant={isUnlocked ? "default" : "outline"}
                            size="sm"
                            disabled={!isUnlocked}
                            asChild={isUnlocked}
                          >
                            {isUnlocked ? (
                              <Link href={`/courses/${courseId}/modules/${module.id}`}>
                                {module.id === "practice-labs" ? "Start Coding" : "Start Module"}
                              </Link>
                            ) : (
                              <span>Locked</span>
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="overview" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="h-5 w-5" />
                  <span>Learning Objectives</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {course.learningObjectives.map((objective, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{objective}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Prerequisites</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {course.prerequisites.map((prereq, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <div className="h-2 w-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span className="text-sm">{prereq}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="instructor" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={course.instructorAvatar || "/placeholder.svg"} alt={course.instructor} />
                  <AvatarFallback>
                    {course.instructor
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>{course.instructor}</CardTitle>
                  <CardDescription>Technology Expert</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">{course.instructorBio}</p>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold">15+</div>
                  <div className="text-sm text-muted-foreground">Courses</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">50K+</div>
                  <div className="text-sm text-muted-foreground">Students</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">4.8</div>
                  <div className="text-sm text-muted-foreground">Rating</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reviews" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Student Reviews</CardTitle>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="text-lg font-semibold">{course.rating}</span>
                </div>
                <span className="text-muted-foreground">({course.reviews} reviews)</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-b pb-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">John Doe</p>
                      <div className="flex items-center space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Excellent course! The practice labs with integrated compiler made learning so much more effective.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add-to-wishlist confirmation dialog */}
      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent className="sm:max-w-[420px] bg-white dark:bg-slate-900">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-red-500 fill-red-500" />
              Saved to Wishlist
            </AlertDialogTitle>
            <AlertDialogDescription className="text-base">
              "{course.title}" has been saved to your wishlist. View it now?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-2 sm:gap-0">
            <AlertDialogCancel className="sm:mr-2">Keep browsing</AlertDialogCancel>
            <AlertDialogAction className="bg-primary hover:bg-primary/90" onClick={() => router.push('/wishlist')}>
              View wishlist
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Course completion dialog */}
      <AlertDialog open={completionOpen} onOpenChange={setCompletionOpen}>
        <AlertDialogContent className="sm:max-w-[420px] bg-white dark:bg-slate-900">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-green-600" />
              Course Completed
            </AlertDialogTitle>
            <AlertDialogDescription className="text-base">
              You have finished all required modules for "{course.title}". It now appears as completed on your profile.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-2 sm:gap-0">
            <AlertDialogCancel>Close</AlertDialogCancel>
            <AlertDialogAction onClick={() => setCompletionOpen(false)}>
              Great!
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
