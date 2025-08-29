"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { useAuth } from "@/contexts/auth-context"

export default function SignUp() {
  const [username, setUsername] = useState("")
  const [name, setName] = useState("")
  const [surname, setSurname] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { signUp } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      await signUp(username, name, surname, email, password, confirmPassword)
      router.push("/dashboard")
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4">
      <motion.div
        animate={{ opacity: 1, y: 0, scale: 1 }}
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="w-full max-w-md bg-white/20 backdrop-blur-xl border border-white/30 text-white rounded-3xl shadow-2xl">
          <CardHeader className="text-center py-6">
            <CardTitle className="text-3xl font-bold">Create Account ✨</CardTitle>
            <p className="text-sm text-white/80 mt-1">Join AIverse Hub and explore the future</p>
          </CardHeader>
          <CardContent className="flex flex-col gap-5 px-6 pb-8">
            {error && <p className="text-red-400 text-sm text-center">{error}</p>}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <Input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="bg-white/20 border border-white/30 text-white placeholder:text-white/60 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-400"
              />
              <Input
                type="text"
                placeholder="First Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="bg-white/20 border border-white/30 text-white placeholder:text-white/60 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-400"
              />
              <Input
                type="text"
                placeholder="Last Name"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                required
                className="bg-white/20 border border-white/30 text-white placeholder:text-white/60 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-400"
              />
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white/20 border border-white/30 text-white placeholder:text-white/60 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-400"
              />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-white/20 border border-white/30 text-white placeholder:text-white/60 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-400"
              />
              <Input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="bg-white/20 border border-white/30 text-white placeholder:text-white/60 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-400"
              />
              <Button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 rounded-xl py-3 text-white font-semibold shadow-lg"
                disabled={loading}
              >
                {loading ? "Creating Account..." : "Sign Up"}
              </Button>
            </form>

            <p className="text-center text-sm text-white/70 mt-2">
              Already have an account?{" "}
              <a href="/auth/signin" className="text-purple-200 hover:underline">
                Sign In
              </a>
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
