"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuth } from "@/contexts/auth-context"
import { Loader2, Mail, ArrowLeft } from "lucide-react"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  const { resetPassword } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      await resetPassword(email)
      setSuccess(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send reset email")
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4">
        <Card className="w-full max-w-md bg-white/20 backdrop-blur-xl border border-white/30 text-white rounded-3xl shadow-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-white">Check your email</CardTitle>
            <CardDescription className="text-white/80">We've sent a password reset link to {email}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert className="bg-white/20 border border-white/30">
              <AlertDescription className="text-white/90">
                If you don't see the email, check your spam folder or try again with a different email address.
              </AlertDescription>
            </Alert>

            <Button asChild className="w-full bg-indigo-600 hover:bg-indigo-700">
              <Link href="/auth/signin">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Sign In
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4">
      <Card className="w-full max-w-md bg-white/20 backdrop-blur-xl border border-white/30 text-white rounded-3xl shadow-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-white">Reset password</CardTitle>
          <CardDescription className="text-white/80">Enter your email address and we'll send you a link to reset your password</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive" className="bg-red-500/20 border border-red-300/30">
              <AlertDescription className="text-red-200">{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-white/60" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-white/20 border border-white/30 text-white placeholder:text-white/60 rounded-xl"
                  required
                />
              </div>
            </div>

            <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 rounded-xl" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                "Send Reset Link"
              )}
            </Button>
          </form>

          <div className="text-center">
            <Link
              href="/auth/signin"
              className="text-sm text-white/70 hover:text-white underline-offset-4 hover:underline inline-flex items-center"
            >
              <ArrowLeft className="mr-1 h-3 w-3" />
              Back to Sign In
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
