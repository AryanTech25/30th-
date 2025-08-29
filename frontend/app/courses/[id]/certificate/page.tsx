"use client"

import { useParams } from "next/navigation"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CertificateGenerator, type CertificateData } from "@/components/certificates/certificate-generator"
import { generateCertificatePDF, downloadCertificate, generateCertificateNumber } from "@/lib/certificate-generator"
import { useProgress } from "@/contexts/progress-context"
import { ArrowLeft, AlertCircle, CheckCircle } from "lucide-react"
import Link from "next/link"

const courseData = {
  "1": {
    title: "Generative AI Fundamentals",
    instructor: "Dr. Sarah Chen",
    duration: "12 hours",
    modules: ["module-1", "module-2", "practice-labs"],
  },
  "2": {
    title: "Agentic AI Systems",
    instructor: "Prof. Michael Rodriguez",
    duration: "15 hours",
    modules: ["module-1", "module-2", "practice-labs"],
  },
  "3": {
    title: "Machine Learning Mastery",
    instructor: "Dr. Emily Watson",
    duration: "18 hours",
    modules: ["module-1", "module-2", "practice-labs"],
  },
  "4": {
    title: "Cybersecurity Essentials",
    instructor: "Dr. James Liu",
    duration: "14 hours",
    modules: ["module-1", "module-2", "practice-labs"],
  },
}

export default function CertificatePage() {
  const params = useParams()
  const courseId = params.id as string
  const [isGenerating, setIsGenerating] = useState(false)
  const [certificateData, setCertificateData] = useState<CertificateData | null>(null)
  const [eligibilityStatus, setEligibilityStatus] = useState<{
    eligible: boolean
    completedModules: number
    totalModules: number
    averageScore: number
    assessmentPassed: boolean
    missingRequirements: string[]
  } | null>(null)

  const { getCourseProgress, isCertificateEligible, getAverageQuizScore } = useProgress()
  const courseProgress = getCourseProgress(courseId)
  const course = courseData[courseId as keyof typeof courseData]

  useEffect(() => {
    if (course && courseProgress) {
      const modules = Object.values(courseProgress.modules)
      const totalModules = course.modules.length
      const completedModules = modules.filter((m) => m.completed).length
      const averageScore = getAverageQuizScore(courseId)
      const assessmentPassed = courseProgress.assessment?.passed || false
      const certificateEligible = isCertificateEligible(courseId)

      const missingRequirements: string[] = []

      // Check if all modules are completed
      if (completedModules < totalModules) {
        missingRequirements.push(`Complete all ${totalModules} modules (${completedModules}/${totalModules} completed)`)
      }

      // Check if final assessment is passed
      if (!assessmentPassed) {
        missingRequirements.push("Pass the final course assessment with at least 50%")
      }

      // Check if average quiz score is at least 50%
      if (averageScore < 50) {
        missingRequirements.push(`Achieve at least 50% average quiz score (current: ${Math.round(averageScore)}%)`)
      }

      const eligible = certificateEligible && missingRequirements.length === 0

      setEligibilityStatus({
        eligible,
        completedModules,
        totalModules,
        averageScore,
        assessmentPassed,
        missingRequirements,
      })

      // Generate certificate data if eligible
      if (eligible) {
        const finalScore = courseProgress.assessment?.score || averageScore
        const grade = finalScore >= 90 ? "A" : finalScore >= 80 ? "B" : finalScore >= 70 ? "C" : "D"

        setCertificateData({
          id: courseId,
          courseName: course.title,
          studentName: "John Doe", // In a real app, this would come from user context
          completionDate: courseProgress.completedAt || new Date(),
          instructor: course.instructor,
          courseHours: course.duration,
          grade,
          certificateNumber: generateCertificateNumber(),
          averageQuizScore: finalScore,
        })
      }
    }
  }, [course, courseProgress, courseId, isCertificateEligible, getAverageQuizScore])

  const handleDownload = async () => {
    if (!certificateData) return

    setIsGenerating(true)
    try {
      const blob = await generateCertificatePDF(certificateData)
      downloadCertificate(certificateData, blob)
    } catch (error) {
      console.error("Failed to generate certificate:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleShare = (platform: string) => {
    if (!certificateData) return

    const certificateUrl = `${window.location.origin}/courses/${courseId}/certificate`
    const text = `I just completed "${certificateData.courseName}" on AIverse Hub and earned my certificate with a ${certificateData.grade} grade! 🎓 #AI #MachineLearning #Certificate`

    const shareUrls = {
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(certificateUrl)}&title=${encodeURIComponent(text)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(certificateUrl)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(certificateUrl)}&quote=${encodeURIComponent(text)}`,
    }

    const url = shareUrls[platform as keyof typeof shareUrls]
    if (url) {
      window.open(url, "_blank", "width=600,height=400")
    }
  }

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

  if (!eligibilityStatus) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p>Loading certificate status...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="ghost" asChild className="mb-6">
        <Link href={`/courses/${courseId}`}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Course
        </Link>
      </Button>

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">
            {eligibilityStatus.eligible ? "Your Certificate" : "Certificate Requirements"}
          </h1>
          <p className="text-muted-foreground">
            {eligibilityStatus.eligible
              ? `Congratulations on completing ${course.title}!`
              : "Complete the requirements below to earn your certificate"}
          </p>
        </div>

        {!eligibilityStatus.eligible && (
          <div className="mb-8">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                <div className="space-y-2">
                  <p className="font-semibold">Certificate Requirements Not Met</p>
                  <p>To earn your certificate, you must:</p>
                  <ul className="list-disc list-inside space-y-1 mt-2">
                    {eligibilityStatus.missingRequirements.map((requirement, index) => (
                      <li key={index} className="text-sm">
                        {requirement}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 p-3 bg-muted rounded-lg">
                    <p className="text-sm font-medium mb-2">Current Progress:</p>
                    <div className="space-y-1 text-sm">
                      <p>
                        Modules: {eligibilityStatus.completedModules}/{eligibilityStatus.totalModules} completed
                      </p>
                      <p>Average Quiz Score: {Math.round(eligibilityStatus.averageScore)}%</p>
                      <p>Final Assessment: {eligibilityStatus.assessmentPassed ? "Passed" : "Not completed"}</p>
                    </div>
                  </div>
                </div>
              </AlertDescription>
            </Alert>

            <div className="mt-6 text-center">
              <Button asChild size="lg">
                <Link href={`/courses/${courseId}`}>Continue Learning</Link>
              </Button>
            </div>
          </div>
        )}

        {eligibilityStatus.eligible && certificateData && (
          <>
            <Alert className="mb-8 border-green-200 bg-green-50 dark:bg-green-950">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800 dark:text-green-200">
                <div className="space-y-1">
                  <p className="font-semibold">Congratulations! You've earned your certificate!</p>
                  <p className="text-sm">
                    You completed all {eligibilityStatus.totalModules} modules and passed the final assessment with{" "}
                    {Math.round(eligibilityStatus.averageScore)}%.
                  </p>
                </div>
              </AlertDescription>
            </Alert>

            <CertificateGenerator
              certificateData={certificateData}
              onDownload={handleDownload}
              onShare={handleShare}
              isGenerating={isGenerating}
            />
          </>
        )}
      </div>
    </div>
  )
}
