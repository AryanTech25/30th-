"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { useAuth } from "@/contexts/auth-context"

export default function SignIn() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { signIn } = useAuth()

  // Redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) router.push("/dashboard")
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      await signIn(email, password)
      router.push("/dashboard")
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-600 via-pink-500 to-indigo-500 p-4">
      <motion.div
        animate={{ opacity: 1, y: 0, scale: 1 }}
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="w-full max-w-md bg-white/20 backdrop-blur-xl border border-white/30 text-white rounded-3xl shadow-2xl">
          <CardHeader className="text-center py-6">
            <CardTitle className="text-3xl font-bold">Welcome Back 👋</CardTitle>
            <p className="text-sm text-white/80 mt-1">Sign in to continue to AIverse Hub</p>
          </CardHeader>
          <CardContent className="flex flex-col gap-5 px-6 pb-8">
            {error && <p className="text-red-400 text-center">{error}</p>}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <Input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-white/20 border border-white/30 text-white placeholder:text-white/60 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-400"
              />
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white/20 border border-white/30 text-white placeholder:text-white/60 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-400"
              />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-white/20 border border-white/30 text-white placeholder:text-white/60 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-400"
              />
              <Button
                type="submit"
                className="bg-purple-600 hover:bg-purple-700 rounded-xl py-3 text-white font-semibold shadow-lg"
                disabled={loading}
              >
                {loading ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            <p className="text-center text-sm text-white/70 mt-2">
              Don't have an account?{" "}
              <a href="/auth/signup" className="text-purple-200 hover:underline">
                Sign Up
              </a>
            </p>

            <p className="text-center text-sm text-white/70">
              <a href="/auth/forgot-password" className="text-purple-200 hover:underline">
                Forgot your password?
              </a>
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
