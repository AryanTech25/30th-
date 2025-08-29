"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Award, Download, Calendar, BookOpen } from "lucide-react"
import Link from "next/link"
import type { CertificateData } from "./certificate-generator"

interface CertificateCardProps {
  certificate: CertificateData
  onDownload?: () => void
}

export function CertificateCard({ certificate, onDownload }: CertificateCardProps) {
  return (
    <Card className="hover:shadow-lg transition-all duration-300">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
              <Award className="h-6 w-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-lg">{certificate.courseName}</CardTitle>
              <CardDescription>Certificate of Completion</CardDescription>
            </div>
          </div>
          <Badge variant="default" className="bg-green-600">
            Grade: {certificate.grade}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>Completed: {certificate.completionDate.toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-muted-foreground" />
            <span>Duration: {certificate.courseHours}</span>
          </div>
        </div>

        <div className="text-xs text-muted-foreground">Certificate No: {certificate.certificateNumber}</div>

        <div className="flex gap-2">
          <Button asChild variant="outline" size="sm" className="flex-1 bg-transparent">
            <Link href={`/courses/${certificate.id}/certificate`}>View Certificate</Link>
          </Button>
          {onDownload && (
            <Button onClick={onDownload} size="sm" className="flex-1">
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
