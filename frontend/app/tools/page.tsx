"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Search, Star, TrendingUp, Filter, Heart, Sparkles, Loader2, ExternalLink } from "lucide-react"
import Link from "next/link"
import { useData } from "@/contexts/data-context"
import { useWishlist } from "@/contexts/wishlist-context"
import { useActivity } from "@/contexts/activity-context"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { useRouter } from "next/navigation"
import { AuthGuard } from "@/components/auth/auth-guard"

export default function ToolsPage() {
  const { tools, loading } = useData()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  const { recordToolView } = useActivity()
  const router = useRouter()
  const [featuredTools, setFeaturedTools] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [category, setCategory] = useState("all")
  const [pricing, setPricing] = useState("all")
  const [recommendations, setRecommendations] = useState<any[]>([])
  const [recommendationQuery, setRecommendationQuery] = useState("")
  const [recommendationLoading, setRecommendationLoading] = useState(false)
  const [recommendationExplanation, setRecommendationExplanation] = useState("")
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [confirmName, setConfirmName] = useState<string>("")

  useEffect(() => {
    if (tools.length > 0) {
      setFeaturedTools(tools.slice(0, 3))
    }
  }, [tools])

  const handleGetRecommendations = async () => {
    if (!recommendationQuery.trim()) return

    setRecommendationLoading(true)

    setTimeout(() => {
      const relevantTools = tools
        .filter(
          (tool) =>
            tool.description.toLowerCase().includes(recommendationQuery.toLowerCase()) ||
            tool.tags.some((tag) => tag.toLowerCase().includes(recommendationQuery.toLowerCase())) ||
            tool.category.toLowerCase().includes(recommendationQuery.toLowerCase()),
        )
        .slice(0, 3)

      setRecommendations(relevantTools.length > 0 ? relevantTools : tools.slice(0, 3))
      setRecommendationExplanation(
        relevantTools.length > 0
          ? `Based on your query "${recommendationQuery}", here are the most relevant AI tools for your needs.`
          : "Here are some popular AI tools that might interest you.",
      )
      setRecommendationLoading(false)
    }, 1500)
  }

  const filteredTools = tools.filter((tool) => {
    const matchesSearch =
      !searchQuery ||
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesCategory = category === "all" || tool.category === category
    const matchesPricing = pricing === "all" || tool.pricing === pricing

    return matchesSearch && matchesCategory && matchesPricing
  })

  const handleToggleWishlist = (tool: any) => {
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
      level: tool.level || "All Levels",
      duration: tool.duration || "Flexible",
      students: Number(tool.reviews) || 0,
      rating: Number(tool.rating) || 0,
      reviews: Number(tool.reviews) || 0,
      price: tool.pricing || "Free",
      thumbnail: tool.logo || "/placeholder.svg",
      tags: Array.isArray(tool.tags) ? tool.tags : [],
      instructorAvatar: "/placeholder.svg",
      website: tool.website || undefined,
    })
    setConfirmName(tool.name)
    setConfirmOpen(true)
  }

  const handleToolExplore = (toolId: string) => {
    recordToolView(toolId)
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </div>
    )
  }

  return (
    <AuthGuard>
      <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">AI Tool Explorer</h1>
        <p className="text-muted-foreground">Discover and explore cutting-edge AI tools and platforms</p>
      </div>

      {/* AI Recommendations */}
      <Card className="mb-8 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <span>AI-Powered Recommendations</span>
          </CardTitle>
          <CardDescription>Describe what you're looking for and get personalized tool recommendations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2">
            <Textarea
              placeholder="e.g., I need a tool for generating images from text descriptions..."
              value={recommendationQuery}
              onChange={(e) => setRecommendationQuery(e.target.value)}
              className="flex-1"
              rows={2}
            />
            <Button onClick={handleGetRecommendations} disabled={recommendationLoading || !recommendationQuery.trim()}>
              {recommendationLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
            </Button>
          </div>

          {recommendations.length > 0 && (
            <div className="mt-6">
              <div className="mb-4">
                <h3 className="font-semibold mb-2">Recommended for you:</h3>
                <p className="text-sm text-muted-foreground">{recommendationExplanation}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {recommendations.slice(0, 3).map((tool) => (
                  <Card key={tool.id} className="border-primary/30">
                    <CardHeader className="pb-3">
                      <div className="flex items-center space-x-3">
                        <div className="h-10 w-10 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center overflow-hidden">
                          {tool.logo && tool.logo !== "/placeholder.svg" ? (
                            <img
                              src={tool.logo || "/placeholder.svg"}
                              alt={tool.name}
                              className="h-6 w-6 object-contain"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement
                                target.style.display = "none"
                                target.nextElementSibling?.classList.remove("hidden")
                              }}
                            />
                          ) : null}
                          <div
                            className={`h-6 w-6 bg-gradient-to-br from-primary/20 to-primary/10 rounded flex items-center justify-center ${tool.logo && tool.logo !== "/placeholder.svg" ? "hidden" : ""}`}
                          >
                            <span className="text-xs font-bold text-primary">{tool.name.charAt(0).toUpperCase()}</span>
                          </div>
                        </div>
                        <div>
                          <CardTitle className="text-base">{tool.name}</CardTitle>
                          <Badge variant="secondary" className="text-xs">
                            Recommended
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0 space-y-3">
                      <p className="text-sm text-muted-foreground">{tool.description}</p>
                      <div className="flex space-x-2">
                        <Button size="sm" asChild className="flex-1" onClick={() => handleToolExplore(String(tool.id))}>
                          <Link href={tool.website} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="mr-1 h-3 w-3" />
                            Try Now
                          </Link>
                        </Button>
                        <Button size="sm" variant="outline" asChild onClick={() => handleToolExplore(String(tool.id))}>
                          <Link href={`/tools/${tool.id}`}>Details</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground bg-white" />
          <Input
            placeholder="Search AI tools..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="Language Models">Language Models</SelectItem>
            <SelectItem value="Computer Vision">Computer Vision</SelectItem>
            <SelectItem value="Development Tools">Development Tools</SelectItem>
            <SelectItem value="Creative Tools">Creative Tools</SelectItem>
            <SelectItem value="Content Creation">Content Creation</SelectItem>
            <SelectItem value="Productivity">Productivity</SelectItem>
            <SelectItem value="Search & Research">Search & Research</SelectItem>
            <SelectItem value="ML Libraries">ML Libraries</SelectItem>
            <SelectItem value="ML Platform">ML Platform</SelectItem>
            <SelectItem value="Entertainment">Entertainment</SelectItem>
          </SelectContent>
        </Select>
        <Select value={pricing} onValueChange={setPricing}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Pricing" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Pricing</SelectItem>
            <SelectItem value="Free">Free</SelectItem>
            <SelectItem value="Freemium">Freemium</SelectItem>
            <SelectItem value="Paid">Paid</SelectItem>
            <SelectItem value="Pay-per-use">Pay-per-use</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          More Filters
        </Button>
      </div>

      {/* Featured Tools */}
      {!searchQuery && category === "all" && pricing === "all" && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Featured Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredTools.map((tool) => (
              <Card
                key={tool.id}
                className="group hover:shadow-lg transition-all duration-300 border-2 border-primary/20"
              >
                <CardHeader>
                  <div className="flex items-start space-x-4">
                    <div className="h-12 w-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center overflow-hidden">
                      {tool.logo && tool.logo !== "/placeholder.svg" ? (
                        <img
                          src={tool.logo || "/placeholder.svg"}
                          alt={tool.name}
                          className="h-8 w-8 object-contain"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement
                            target.style.display = "none"
                            target.nextElementSibling?.classList.remove("hidden")
                          }}
                        />
                      ) : null}
                      <div
                        className={`h-8 w-8 bg-gradient-to-br from-primary/20 to-primary/10 rounded flex items-center justify-center ${tool.logo && tool.logo !== "/placeholder.svg" ? "hidden" : ""}`}
                      >
                        <span className="text-xs font-bold text-primary">{tool.name.charAt(0).toUpperCase()}</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{tool.name}</CardTitle>
                        <Badge variant="secondary">Featured</Badge>
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant="outline">{tool.category}</Badge>
                        <Badge variant={tool.pricing === "Free" ? "secondary" : "default"}>{tool.pricing}</Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CardDescription>{tool.description}</CardDescription>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>{tool.rating}</span>
                      <span className="text-muted-foreground">({tool.reviews.toLocaleString()})</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <TrendingUp className="h-4 w-4 text-green-500" />
                      <span className="text-green-500">{tool.popularity}% popular</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm font-medium">Key Features:</div>
                    <div className="flex flex-wrap gap-1">
                      {tool.features.map((feature: string) => (
                        <Badge key={feature} variant="secondary" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button asChild className="flex-1" onClick={() => handleToolExplore(String(tool.id))}>
                      <Link href={tool.website} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Try Now
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm" asChild onClick={() => handleToolExplore(String(tool.id))}>
                      <Link href={`/tools/${tool.id}`}>Details</Link>
                    </Button>
                    <Button
                      variant={isInWishlist(String(tool.id), 'tool') ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleToggleWishlist(tool)}
                      className={isInWishlist(String(tool.id), 'tool') ? "bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-300" : ""}
                    >
                      <Heart className={`h-4 w-4 ${isInWishlist(String(tool.id), 'tool') ? "fill-red-500" : ""}`} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* All Tools */}
      <div>
        <h2 className="text-xl font-semibold mb-4">
          {searchQuery || category !== "all" || pricing !== "all" ? "Search Results" : "All Tools"}
          <span className="text-sm font-normal text-muted-foreground ml-2">({filteredTools.length} tools)</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool) => (
            <Card key={tool.id} className="group hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-start space-x-4">
                  <div className="h-12 w-12 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 rounded-lg flex items-center justify-center overflow-hidden">
                    {tool.logo && tool.logo !== "/placeholder.svg" ? (
                      <img
                        src={tool.logo || "/placeholder.svg"}
                        alt={tool.name}
                        className="h-8 w-8 object-contain"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.style.display = "none"
                          target.nextElementSibling?.classList.remove("hidden")
                        }}
                      />
                    ) : null}
                    <div
                      className={`h-8 w-8 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 rounded flex items-center justify-center ${tool.logo && tool.logo !== "/placeholder.svg" ? "hidden" : ""}`}
                    >
                      <span className="text-xs font-bold text-primary">{tool.name.charAt(0).toUpperCase()}</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg">{tool.name}</CardTitle>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant="outline">{tool.category}</Badge>
                      <Badge variant={tool.pricing === "Free" ? "secondary" : "default"}>{tool.pricing}</Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <CardDescription>{tool.description}</CardDescription>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span>{tool.rating}</span>
                    <span className="text-muted-foreground">({tool.reviews.toLocaleString()})</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    <span className="text-green-500">{tool.popularity}%</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1">
                  {tool.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex space-x-2">
                  <Button asChild className="flex-1" onClick={() => handleToolExplore(String(tool.id))}>
                    <Link href={tool.website} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Try Now
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" asChild onClick={() => handleToolExplore(String(tool.id))}>
                    <Link href={`/tools/${tool.id}`}>Details</Link>
                  </Button>
                  <Button
                    variant={isInWishlist(String(tool.id), 'tool') ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleToggleWishlist(tool)}
                    className={isInWishlist(String(tool.id), 'tool') ? "bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-300" : ""}
                  >
                    <Heart className={`h-4 w-4 ${isInWishlist(String(tool.id), 'tool') ? "fill-red-500" : ""}`} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredTools.length === 0 && (
          <div className="text-center py-12">
            <div className="text-muted-foreground mb-4">No tools found matching your criteria</div>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("")
                setCategory("all")
                setPricing("all")
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>

      {/* Load More */}
      {filteredTools.length > 0 && (
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Load More Tools
          </Button>
        </div>
      )}
      </div>
      {/* Add-to-wishlist confirmation dialog */}
      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent className="sm:max-w-[420px] bg-white dark:bg-slate-900">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-red-500 fill-red-500" />
              Saved to Wishlist
            </AlertDialogTitle>
            <AlertDialogDescription className="text-base">
              "{confirmName}" has been saved to your wishlist. View it now?
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
      </AuthGuard>
  )
}
