"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useWishlist } from "@/contexts/wishlist-context"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  ExternalLink,
  Star,
  TrendingUp,
  Heart,
  Share2,
  BookOpen,
  Code,
  Zap,
  Users,
  Calendar,
  Globe,
  Github,
  Twitter,
  ChevronLeft,
} from "lucide-react"
import Link from "next/link"
import { useActivity } from "@/contexts/activity-context"

export default function ToolDetailPage({ params }: { params: { id: string } }) {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  const [confirmOpen, setConfirmOpen] = useState(false)
  const router = useRouter()
  const { recordToolView } = useActivity()
  // Mock tool data - in production, fetch from API
  const tool = {
    id: Number.parseInt(params.id),
    name: "OpenAI GPT-4",
    description:
      "Advanced language model for text generation, coding assistance, and analysis with unprecedented reasoning capabilities.",
    longDescription:
      "GPT-4 is OpenAI's most advanced system, producing safer and more useful responses. It can solve difficult problems with greater accuracy, thanks to its broader general knowledge and problem solving abilities. GPT-4 is more creative and collaborative than ever before. It can generate, edit, and iterate with users on creative and technical writing tasks.",
    category: "Language Models",
    pricing: "Paid",
    pricingDetails: {
      free: false,
      plans: [
        { name: "API Usage", price: "$0.03/1K tokens", description: "Pay per token usage" },
        { name: "ChatGPT Plus", price: "$20/month", description: "Unlimited GPT-4 access" },
      ],
    },
    rating: 4.7,
    reviews: 15420,
    popularity: 95,
    logo: "/placeholder.svg?height=120&width=120",
    banner: "/placeholder.svg?height=300&width=800",
    tags: ["NLP", "Text Generation", "API", "Reasoning", "Code"],
    features: [
      "Advanced reasoning capabilities",
      "Code completion and debugging",
      "Multi-language support",
      "Image understanding",
      "Function calling",
      "JSON mode",
    ],
    useCases: [
      "Content creation and editing",
      "Code generation and review",
      "Data analysis and insights",
      "Customer support automation",
      "Educational tutoring",
      "Creative writing assistance",
    ],
    website: "https://openai.com/gpt-4",
    documentation: "https://platform.openai.com/docs",
    github: "https://github.com/openai",
    twitter: "https://twitter.com/openai",
    company: "OpenAI",
    founded: "2015",
    employees: "500+",
    funding: "$11.3B",
    lastUpdated: "2024-01-15",
    integrations: ["Python", "Node.js", "REST API", "Zapier", "Microsoft", "Slack"],
    alternatives: ["Anthropic Claude", "Google Gemini", "Meta Llama", "Mistral AI"],
    pros: [
      "Exceptional reasoning capabilities",
      "High-quality outputs",
      "Extensive API documentation",
      "Strong safety measures",
      "Regular updates and improvements",
    ],
    cons: [
      "Higher cost compared to alternatives",
      "Rate limits on API usage",
      "Requires internet connection",
      "May have knowledge cutoff limitations",
    ],
  }

  const toggleSave = () => {
    const id = String(tool.id)
    if (isInWishlist(id, 'tool')) {
      removeFromWishlist(id, 'tool')
      return
    }
    addToWishlist({
      itemType: 'tool',
      id,
      title: tool.name,
      instructor: tool.company || tool.name,
      description: tool.description || "",
      level: "All Levels",
      duration: "Flexible",
      students: Number(tool.reviews) || 0,
      rating: Number(tool.rating) || 0,
      reviews: Number(tool.reviews) || 0,
      price: tool.pricing || "Free",
      thumbnail: tool.logo || "/placeholder.svg",
      tags: Array.isArray(tool.tags) ? tool.tags : [],
      instructorAvatar: "/placeholder.svg",
      website: tool.website || undefined,
    })
    setConfirmOpen(true)
  }

  const handleTryNow = () => {
    recordToolView(String(tool.id))
  }

  useEffect(() => {
    if (params?.id) recordToolView(String(params.id))
  }, [params?.id])

  const reviews = [
    {
      id: 1,
      user: "Sarah Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 5,
      date: "2024-01-10",
      title: "Game-changing for development",
      content:
        "GPT-4 has revolutionized how I approach coding problems. The reasoning capabilities are incredible and it rarely makes mistakes in complex logic.",
    },
    {
      id: 2,
      user: "Mike Rodriguez",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4,
      date: "2024-01-08",
      title: "Excellent but expensive",
      content:
        "The quality is outstanding, but the pricing can add up quickly for heavy usage. Worth it for professional applications though.",
    },
    {
      id: 3,
      user: "Emily Watson",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 5,
      date: "2024-01-05",
      title: "Perfect for content creation",
      content:
        "I use GPT-4 daily for writing and editing. It understands context incredibly well and maintains consistency across long documents.",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Navigation */}
      <div className="mb-6">
        <Button variant="ghost" asChild>
          <Link href="/tools">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Tools
          </Link>
        </Button>
      </div>

      {/* Tool Header */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2">
          {/* Banner Image */}
          <div className="aspect-video bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 rounded-lg mb-6 overflow-hidden">
            <img src={tool.banner || "/placeholder.svg"} alt={tool.name} className="w-full h-full object-cover" />
          </div>

          <div className="flex items-start space-x-4 mb-6">
            <div className="h-16 w-16 bg-white dark:bg-slate-800 rounded-lg p-2 shadow-sm">
              <img src={tool.logo || "/placeholder.svg"} alt={tool.name} className="w-full h-full object-contain" />
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <h1 className="text-3xl font-bold">{tool.name}</h1>
                <Badge variant="outline">{tool.category}</Badge>
              </div>
              <p className="text-lg text-muted-foreground mb-4">{tool.description}</p>

              {/* Stats */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{tool.rating}</span>
                  <span>({tool.reviews.toLocaleString()} reviews)</span>
                </div>
                <div className="flex items-center space-x-1">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span className="text-green-500 font-medium">{tool.popularity}% popularity</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="h-4 w-4" />
                  <span>Used by {(tool.reviews * 10).toLocaleString()}+ developers</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>Updated {tool.lastUpdated}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {tool.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 mb-8">
            <Button size="lg" asChild onClick={handleTryNow}>
              <Link href={tool.website} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                Try {tool.name}
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href={tool.documentation} target="_blank" rel="noopener noreferrer">
                <BookOpen className="mr-2 h-4 w-4" />
                Documentation
              </Link>
            </Button>
            <Button
              variant={isInWishlist(String(tool.id), 'tool') ? "default" : "outline"}
              size="lg"
              onClick={toggleSave}
              className={isInWishlist(String(tool.id), 'tool') ? "bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-300" : ""}
            >
              <Heart className={`mr-2 h-4 w-4 ${isInWishlist(String(tool.id), 'tool') ? "fill-red-500" : ""}`} />
              {isInWishlist(String(tool.id), 'tool') ? "Saved" : "Save"}
            </Button>
            <Button variant="outline" size="lg">
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="space-y-6">
            {/* Pricing */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Pricing</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {tool.pricingDetails.plans.map((plan, index) => (
                    <div key={index} className="border rounded-lg p-3">
                      <div className="font-medium">{plan.name}</div>
                      <div className="text-lg font-bold text-primary">{plan.price}</div>
                      <div className="text-sm text-muted-foreground">{plan.description}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Company Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Company</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Company</span>
                  <span className="font-medium">{tool.company}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Founded</span>
                  <span className="font-medium">{tool.founded}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Employees</span>
                  <span className="font-medium">{tool.employees}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Funding</span>
                  <span className="font-medium">{tool.funding}</span>
                </div>

                <Separator />

                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={tool.website} target="_blank" rel="noopener noreferrer">
                      <Globe className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={tool.github} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={tool.twitter} target="_blank" rel="noopener noreferrer">
                      <Twitter className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>User Rating</span>
                      <span>{tool.rating}/5</span>
                    </div>
                    <Progress value={tool.rating * 20} />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Popularity</span>
                      <span>{tool.popularity}%</span>
                    </div>
                    <Progress value={tool.popularity} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Content Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
          <TabsTrigger value="alternatives">Alternatives</TabsTrigger>
          <TabsTrigger value="pricing">Pricing</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>About {tool.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{tool.longDescription}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Use Cases</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {tool.useCases.map((useCase, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <Zap className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{useCase}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="features" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-green-600">Pros</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {tool.pros.map((pro, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <div className="h-2 w-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-sm">{pro}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-red-600">Cons</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {tool.cons.map((con, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <div className="h-2 w-2 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-sm">{con}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Key Features</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {tool.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2 p-3 border rounded-lg">
                    <Code className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Integrations & SDKs</CardTitle>
              <CardDescription>Available integrations and software development kits</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {tool.integrations.map((integration, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="h-8 w-8 bg-gradient-to-br from-primary/20 to-primary/10 rounded flex items-center justify-center">
                      <Code className="h-4 w-4" />
                    </div>
                    <span className="font-medium">{integration}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reviews" className="mt-6">
          <div className="space-y-6">
            {/* Review Summary */}
            <Card>
              <CardHeader>
                <CardTitle>User Reviews</CardTitle>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Star className="h-6 w-6 fill-yellow-400 text-yellow-400" />
                    <span className="text-2xl font-bold">{tool.rating}</span>
                  </div>
                  <div className="text-muted-foreground">Based on {tool.reviews.toLocaleString()} reviews</div>
                </div>
              </CardHeader>
            </Card>

            {/* Individual Reviews */}
            <div className="space-y-4">
              {reviews.map((review) => (
                <Card key={review.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage src={review.avatar || "/placeholder.svg"} alt={review.user} />
                          <AvatarFallback>
                            {review.user
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{review.user}</div>
                          <div className="flex items-center space-x-2">
                            <div className="flex items-center">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={`h-3 w-3 ${star <= review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-muted-foreground">{review.date}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <CardTitle className="text-lg">{review.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{review.content}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="alternatives" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Similar Tools</CardTitle>
              <CardDescription>Other tools you might consider</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tool.alternatives.map((alternative, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="h-10 w-10 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 rounded-lg flex items-center justify-center">
                      <Code className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{alternative}</div>
                      <div className="text-sm text-muted-foreground">Alternative AI tool</div>
                    </div>
                    <Button variant="outline" size="sm">
                      Compare
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pricing" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tool.pricingDetails.plans.map((plan, index) => (
              <Card key={index} className="relative">
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <div className="text-3xl font-bold text-primary">{plan.price}</div>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" asChild onClick={handleTryNow}>
                    <Link href={tool.website} target="_blank" rel="noopener noreferrer">
                      Get Started
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
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
              "{tool.name}" has been saved to your wishlist. View it now?
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
    </div>
  )
}
