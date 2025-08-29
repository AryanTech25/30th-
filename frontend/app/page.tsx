"use client";
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import FlashcardPreview from "@/components/flashcards/flashcard-preview"
import Footer from "@/components/footer"
// app/page.tsx
//import { AuthButtons } from "@/components/auth/auth-buttons"
// Removed duplicate default export Page function to fix redeclaration error.

import {
  BookOpen,
  Wrench,
  MessageSquare,
  Shield,
  Search,
  Trophy,
  Briefcase,
  ArrowRight,
  Sparkles,
  Users,
  Target,
} from "lucide-react"

const features = [
  {
    title: "AI/ML Learning Paths",
    description: "Structured courses from basics to advanced AI concepts with hands-on projects",
    icon: BookOpen,
    href: "/courses",
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "AI Tools Explorer",
    description: "Discover and compare the latest AI tools and platforms for your projects",
    icon: Wrench,
    href: "/tools",
    color: "from-purple-500 to-pink-500",
  },
  {
    title: "ML Learning Agent",
    description: "Chat with AI tutors for personalized learning guidance and support",
    icon: MessageSquare,
    href: "/chat",
    color: "from-green-500 to-emerald-500",
  },
  {
    title: "Cyber Threat Simulator",
    description: "Practice cybersecurity skills with realistic threat scenarios",
    icon: Shield,
    href: "/cybersecurity",
    color: "from-red-500 to-orange-500",
  },
 
  {
    title: "Model Leaderboard",
    description: "Compare and track performance of different AI models and algorithms",
    icon: Trophy,
    href: "/leaderboard",
    color: "from-yellow-500 to-amber-500",
  },
  // {
  //   title: "AI Career Navigator",
  //   description: "Get personalized career guidance and skill recommendations",
  //   icon: Briefcase,
  //   href: "/career",
  //   color: "from-teal-500 to-cyan-500",
  // },
]

// const stats = [
//   { label: "Active Learners", value: "10K+", icon: Users },
//   { label: "AI Tools", value: "500+", icon: Wrench },
//   { label: "Courses", value: "100+", icon: BookOpen },
//   { label: "Success Rate", value: "95%", icon: Target },
// ]

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-950 dark:via-blue-950 dark:to-indigo-950">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25" />
        <div className="container relative mx-auto px-4 py-24 sm:py-32">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-8 flex justify-center">
              <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                <Sparkles className="mr-1 h-3 w-3" />
                Next-Gen AI Learning Platform
              </Badge>
            </div>
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-6xl font-serif">
              Evolving with AI through
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {" "}
                AIverse Hub
              </span>
            </h1>
            <p className="mb-10 text-lg leading-8 text-slate-600 dark:text-slate-300 sm:text-xl">
              Your comprehensive platform for evolving with artificial intelligence and machine learning. From
              interactive courses to hands-on tools, accelerate your journey into the future of technology.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <Link href="/dashboard">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/courses">Explore Courses</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section
      <section className="border-b bg-white/50 dark:bg-slate-900/50 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div key={index} className="text-center">
                  <div className="mb-2 flex justify-center">
                    <div className="rounded-full bg-gradient-to-r from-blue-500 to-purple-500 p-3">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">{stat.label}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section> */}

      {/* Features Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl font-serif">
              Everything You Need to Evolve with AI
            </h2>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
              Comprehensive tools and resources designed to accelerate your AI/ML evolution journey
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
  {features.map((feature, index) => {
    const Icon = feature.icon
    return (
      <Card
        key={index}
        className="relative overflow-hidden border-2 transition-all duration-300 hover:shadow-lg group"
      >
        {/* 🔥 Changed here: added pointer-events-none */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-35 group-hover:opacity-50 transition-opacity duration-300 pointer-events-none`}
        ></div>

        <CardHeader className="pb-4">
          <div
            className={`w-12 h-12 rounded-lg flex items-center justify-center ${feature.color}`}
          >
            <Icon className="h-6 w-6 text-white" />
          </div>
          <CardTitle className="mt-4">{feature.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>{feature.description}</CardDescription>
          <Button
            asChild
            variant="ghost"
            className="group-hover:text-blue-600 p-0 h-auto font-medium"
          >
            <Link href={feature.href}>
              <span className="flex items-center">
                Explore
                <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </Button>
        </CardContent>
      </Card>
    )
  })}
</div>

        </div>
      </section>

      {/* Flashcards Preview Section */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900/50">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl font-serif">
              Test Your Knowledge
            </h2>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
              Practice with interactive flashcards covering key AI/ML concepts
            </p>
          </div>

          <FlashcardPreview />

          <div className="text-center mt-8">
            <Button asChild variant="outline" size="lg">
              <Link href="/courses">
                Access More Flashcards
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold text-white font-serif">Ready to Evolve with AI?</h2>
          <p className="mb-8 text-xl text-blue-100">
            Join thousands of learners evolving with the future of technology
          </p>
          <Button asChild size="lg" variant="secondary">
            <Link href="/dashboard">
              Start Learning Today
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer Component */}
      <Footer />
    </div>
  )
}
