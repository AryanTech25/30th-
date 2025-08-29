"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, Award, Calendar, User, BookOpen, Share2, Linkedin, Twitter, Facebook } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export interface CertificateData {
  id: string
  courseName: string
  studentName: string
  completionDate: Date
  instructor: string
  courseHours: string
  grade: string
  certificateNumber: string
  averageQuizScore: number
}

interface CertificateGeneratorProps {
  certificateData: CertificateData
  onDownload: () => void
  onShare: (platform: string) => void
  isGenerating?: boolean
}

export function CertificateGenerator({
  certificateData,
  onDownload,
  onShare,
  isGenerating,
}: CertificateGeneratorProps) {
  const getGradeColor = (grade: string) => {
    switch (grade) {
      case "A":
        return "bg-green-600"
      case "B":
        return "bg-blue-600"
      case "C":
        return "bg-yellow-600"
      default:
        return "bg-gray-600"
    }
  }

  return (
    <div className="space-y-6">
      {/* Certificate Preview */}
      <Card className="overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="text-center space-y-2">
            <Award className="h-12 w-12 mx-auto" />
            <CardTitle className="text-2xl font-serif">Certificate of Completion</CardTitle>
            <CardDescription className="text-blue-100">AIverse Hub - AI/ML Learning Platform</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="p-8">
          <div className="text-center space-y-6">
            {/* Main Certificate Content */}
            <div className="space-y-4">
              <p className="text-lg text-muted-foreground">This is to certify that</p>
              <h2 className="text-3xl font-bold font-serif text-primary">{certificateData.studentName}</h2>
              <p className="text-lg text-muted-foreground">has successfully completed the course</p>
              <h3 className="text-2xl font-semibold text-slate-800 dark:text-slate-200">
                {certificateData.courseName}
              </h3>
              <p className="text-sm text-muted-foreground">
                with an average quiz score of {Math.round(certificateData.averageQuizScore)}%
              </p>
            </div>

            {/* Course Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-6 border-t border-b">
              <div className="text-center">
                <Calendar className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                <p className="text-sm text-muted-foreground">Completion Date</p>
                <p className="font-semibold">{certificateData.completionDate.toLocaleDateString()}</p>
              </div>
              <div className="text-center">
                <BookOpen className="h-6 w-6 mx-auto mb-2 text-green-600" />
                <p className="text-sm text-muted-foreground">Course Duration</p>
                <p className="font-semibold">{certificateData.courseHours}</p>
              </div>
              <div className="text-center">
                <User className="h-6 w-6 mx-auto mb-2 text-purple-600" />
                <p className="text-sm text-muted-foreground">Instructor</p>
                <p className="font-semibold">{certificateData.instructor}</p>
              </div>
            </div>

            {/* Grade and Certificate Number */}
            <div className="flex justify-between items-center">
              <div>
                <Badge className={`${getGradeColor(certificateData.grade)} text-lg px-4 py-2`}>
                  Grade: {certificateData.grade}
                </Badge>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Certificate No.</p>
                <p className="font-mono text-sm">{certificateData.certificateNumber}</p>
              </div>
            </div>

            {/* Signature Area */}
            <div className="pt-8">
              <div className="border-t border-gray-300 w-48 mx-auto mb-2"></div>
              <p className="text-sm text-muted-foreground">AIverse Hub Certification Authority</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button onClick={onDownload} disabled={isGenerating} size="lg" className="px-8">
          <Download className="mr-2 h-5 w-5" />
          {isGenerating ? "Generating PDF..." : "Download Certificate"}
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="lg" className="px-8 bg-transparent">
              <Share2 className="mr-2 h-5 w-5" />
              Share Certificate
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center" className="w-56">
            <DropdownMenuItem onClick={() => onShare("linkedin")} className="cursor-pointer">
              <Linkedin className="mr-2 h-4 w-4 text-blue-600" />
              Share on LinkedIn
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onShare("twitter")} className="cursor-pointer">
              <Twitter className="mr-2 h-4 w-4 text-blue-400" />
              Share on Twitter
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onShare("facebook")} className="cursor-pointer">
              <Facebook className="mr-2 h-4 w-4 text-blue-700" />
              Share on Facebook
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          Your certificate will be downloaded as a PDF file and can be shared on professional networks
        </p>
      </div>
    </div>
  )
}
