// "use client"

// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// import { Progress } from "@/components/ui/progress"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { useProgress } from "@/contexts/progress-context"
// import { useData } from "@/contexts/data-context"
// import Link from "next/link"
// import {
//   Briefcase,
//   TrendingUp,
//   Users,
//   DollarSign,
//   Clock,
//   Star,
//   ArrowRight,
//   CheckCircle,
//   PlayCircle,
//   Lock,
// } from "lucide-react"

// export default function CareerPage() {
//   const { getCourseProgress } = useProgress()
//   const { getCareerPaths, getMentors } = useData()

//   const careerPaths = getCareerPaths()
//   const mentors = getMentors()

//   // Calculate skill levels based on actual course progress
//   const calculateSkillLevel = (courseIds: string[]) => {
//     const totalProgress = courseIds.reduce((sum, courseId) => {
//       const progress = getCourseProgress(courseId)
//       return sum + (progress?.overallProgress || 0)
//     }, 0)
//     return Math.round(totalProgress / courseIds.length)
//   }

//   const skillAssessment = [
//     {
//       skill: "Python Programming",
//       level: calculateSkillLevel(["course-1", "course-2"]),
//       required: 90,
//       courses: ["course-1", "course-2"],
//     },
//     {
//       skill: "Machine Learning",
//       level: calculateSkillLevel(["course-1", "course-5"]),
//       required: 85,
//       courses: ["course-1", "course-5"],
//     },
//     {
//       skill: "Deep Learning",
//       level: calculateSkillLevel(["course-2", "course-7"]),
//       required: 80,
//       courses: ["course-2", "course-7"],
//     },
//     {
//       skill: "Data Analysis",
//       level: calculateSkillLevel(["course-1", "course-3"]),
//       required: 75,
//       courses: ["course-1", "course-3"],
//     },
//     {
//       skill: "Computer Vision",
//       level: calculateSkillLevel(["course-4"]),
//       required: 70,
//       courses: ["course-4"],
//     },
//     {
//       skill: "MLOps",
//       level: calculateSkillLevel(["course-8"]),
//       required: 70,
//       courses: ["course-8"],
//     },
//   ]

//   // Dynamic learning path based on selected career (ML Engineer as default)
//   const selectedCareerPath = careerPaths[0] // ML Engineer
//   const learningPath = selectedCareerPath.learningPath.map((step, index) => {
//     const progress = getCourseProgress(step.courseId)
//     const isCompleted = progress?.certificateEarned || false
//     const progressPercentage = progress?.overallProgress || 0
//     const isUnlocked =
//       index === 0 || (learningPath[index - 1] && getCourseProgress(learningPath[index - 1].courseId)?.certificateEarned)

//     return {
//       step: index + 1,
//       courseId: step.courseId,
//       title: step.title,
//       description: `Master the fundamentals and advance your skills`,
//       duration: step.duration,
//       status: isCompleted ? "completed" : progressPercentage > 0 ? "in-progress" : isUnlocked ? "available" : "locked",
//       progress: progressPercentage,
//     }
//   })

//   const getStepIcon = (status: string) => {
//     switch (status) {
//       case "completed":
//         return <CheckCircle className="h-5 w-5 text-green-500" />
//       case "in-progress":
//         return <PlayCircle className="h-5 w-5 text-blue-500" />
//       case "available":
//         return <PlayCircle className="h-5 w-5 text-gray-500" />
//       default:
//         return <Lock className="h-5 w-5 text-gray-400" />
//     }
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       {/* Header */}
//       <div className="mb-8">
//         <h1 className="text-3xl font-bold mb-2">AI Career Navigator</h1>
//         <p className="text-muted-foreground">
//           Get personalized career guidance and build your path in artificial intelligence
//         </p>
//       </div>

//       {/* Career Assessment */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
//         <Card className="lg:col-span-2">
//           <CardHeader>
//             <CardTitle>Recommended Career Paths</CardTitle>
//             <CardDescription>Based on your skills, interests, and learning progress</CardDescription>
//           </CardHeader>
//           <CardContent className="space-y-6">
//             {careerPaths.map((path) => {
//               const pathProgress = calculateSkillLevel(path.requiredCourses)
//               const completedCourses = path.requiredCourses.filter(
//                 (courseId) => getCourseProgress(courseId)?.certificateEarned,
//               ).length

//               return (
//                 <div key={path.id} className="border rounded-lg p-6 hover:shadow-lg transition-all duration-300">
//                   <div className="flex items-start justify-between mb-4">
//                     <div className="flex-1">
//                       <h3 className="text-lg font-semibold mb-2">{path.title}</h3>
//                       <p className="text-muted-foreground mb-3">{path.description}</p>
//                       <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-2">
//                         <div className="flex items-center space-x-1">
//                           <Briefcase className="h-4 w-4" />
//                           <span>{path.level}</span>
//                         </div>
//                         <div className="flex items-center space-x-1">
//                           <DollarSign className="h-4 w-4" />
//                           <span>{path.avgSalary}</span>
//                         </div>
//                         <div className="flex items-center space-x-1">
//                           <TrendingUp className="h-4 w-4 text-green-500" />
//                           <span className="text-green-500">{path.growth} growth</span>
//                         </div>
//                       </div>
//                       <div className="text-sm text-muted-foreground">
//                         Progress: {completedCourses}/{path.requiredCourses.length} courses completed
//                       </div>
//                       <Progress value={pathProgress} className="mt-2" />
//                     </div>
//                     <div className="text-right">
//                       <div className="text-2xl font-bold text-primary">{Math.max(path.matchScore, pathProgress)}%</div>
//                       <div className="text-xs text-muted-foreground">match</div>
//                     </div>
//                   </div>

//                   <div className="space-y-3">
//                     <div>
//                       <div className="text-sm font-medium mb-2">Required Skills:</div>
//                       <div className="flex flex-wrap gap-1">
//                         {path.skills.map((skill) => (
//                           <Badge key={skill} variant="secondary" className="text-xs">
//                             {skill}
//                           </Badge>
//                         ))}
//                       </div>
//                     </div>

//                     <div>
//                       <div className="text-sm font-medium mb-2">Top Companies:</div>
//                       <div className="flex flex-wrap gap-1">
//                         {path.companies.map((company) => (
//                           <Badge key={company} variant="outline" className="text-xs">
//                             {company}
//                           </Badge>
//                         ))}
//                       </div>
//                     </div>
//                   </div>

//                   <div className="flex space-x-2 mt-4">
//                     <Button asChild className="flex-1">
//                       <Link href="/courses">
//                         Start Learning Path <ArrowRight className="ml-2 h-4 w-4" />
//                       </Link>
//                     </Button>
//                     <Button variant="outline">Job Market</Button>
//                   </div>
//                 </div>
//               )
//             })}
//           </CardContent>
//         </Card>

//         {/* Skill Assessment */}
//         <div className="space-y-6">
//           <Card>
//             <CardHeader>
//               <CardTitle>Skill Assessment</CardTitle>
//               <CardDescription>Your current skills vs. ML Engineer requirements</CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               {skillAssessment.map((skill) => (
//                 <div key={skill.skill} className="space-y-2">
//                   <div className="flex items-center justify-between text-sm">
//                     <span className="font-medium">{skill.skill}</span>
//                     <span className="text-muted-foreground">
//                       {skill.level}% / {skill.required}%
//                     </span>
//                   </div>
//                   <div className="relative">
//                     <Progress value={skill.required} className="h-2 bg-muted" />
//                     <Progress
//                       value={skill.level}
//                       className="h-2 absolute top-0 left-0"
//                       style={{
//                         background: skill.level >= skill.required ? "hsl(var(--primary))" : "hsl(var(--destructive))",
//                       }}
//                     />
//                   </div>
//                   {skill.level < skill.required && (
//                     <Button asChild variant="outline" size="sm" className="w-full mt-2 bg-transparent">
//                       <Link href="/courses">Improve Skill</Link>
//                     </Button>
//                   )}
//                 </div>
//               ))}
//               <Button asChild className="w-full mt-4">
//                 <Link href="/courses">Take Courses</Link>
//               </Button>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardHeader>
//               <CardTitle>Your Learning Path</CardTitle>
//               <CardDescription>Personalized roadmap to ML Engineer</CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               {learningPath.map((step) => (
//                 <div key={step.step} className="flex items-start space-x-3">
//                   <div className="mt-1">{getStepIcon(step.status)}</div>
//                   <div className="flex-1 space-y-1">
//                     <div className="font-medium text-sm">{step.title}</div>
//                     <div className="text-xs text-muted-foreground">{step.description}</div>
//                     <div className="flex items-center space-x-2 text-xs text-muted-foreground">
//                       <Clock className="h-3 w-3" />
//                       <span>{step.duration}</span>
//                     </div>
//                     {step.progress > 0 && (
//                       <div className="space-y-1">
//                         <Progress value={step.progress} className="h-1" />
//                         <div className="text-xs text-muted-foreground">{Math.round(step.progress)}% complete</div>
//                       </div>
//                     )}
//                     {step.status !== "locked" && (
//                       <Button asChild variant="outline" size="sm" className="mt-2 bg-transparent">
//                         <Link href={`/courses/${step.courseId.split("-")[1]}`}>
//                           {step.status === "completed"
//                             ? "Review Course"
//                             : step.status === "in-progress"
//                               ? "Continue"
//                               : "Start Course"}
//                         </Link>
//                       </Button>
//                     )}
//                   </div>
//                 </div>
//               ))}
//             </CardContent>
//           </Card>
//         </div>
//       </div>

//       {/* Mentorship */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Connect with Mentors</CardTitle>
//           <CardDescription>Get guidance from industry experts and experienced professionals</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             {mentors.map((mentor, index) => (
//               <div key={index} className="border rounded-lg p-4 hover:shadow-lg transition-all duration-300">
//                 <div className="flex items-center space-x-3 mb-3">
//                   <Avatar className="h-12 w-12">
//                     <AvatarImage src={mentor.avatar || "/placeholder.svg"} alt={mentor.name} />
//                     <AvatarFallback>{mentor.name.charAt(0)}</AvatarFallback>
//                   </Avatar>
//                   <div>
//                     <div className="font-semibold">{mentor.name}</div>
//                     <div className="text-sm text-muted-foreground">{mentor.role}</div>
//                   </div>
//                 </div>

//                 <div className="space-y-3">
//                   <div className="flex items-center justify-between text-sm">
//                     <div className="flex items-center space-x-1">
//                       <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
//                       <span>{mentor.rating}</span>
//                     </div>
//                     <div className="flex items-center space-x-1">
//                       <Users className="h-3 w-3" />
//                       <span>{mentor.sessions} sessions</span>
//                     </div>
//                   </div>

//                   <div className="flex flex-wrap gap-1">
//                     {mentor.expertise.map((skill) => (
//                       <Badge key={skill} variant="secondary" className="text-xs">
//                         {skill}
//                       </Badge>
//                     ))}
//                   </div>

//                   <Button className="w-full" size="sm">
//                     Book Session
//                   </Button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }
