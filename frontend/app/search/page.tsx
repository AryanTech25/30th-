import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, BookOpen, ExternalLink, Clock, Star, Filter } from "lucide-react"

export default function SearchPage() {
  const searchResults = [
    {
      id: 1,
      title: "Introduction to Transformer Architecture",
      type: "Course Lesson",
      description:
        "Learn about the revolutionary transformer architecture that powers modern language models like GPT and BERT. Covers attention mechanisms, positional encoding, and multi-head attention.",
      source: "Deep Learning with PyTorch",
      relevanceScore: 0.95,
      lastUpdated: "2024-01-15",
      tags: ["transformers", "attention", "nlp"],
    },
    {
      id: 2,
      title: "Attention Is All You Need - Paper Summary",
      type: "Research Paper",
      description:
        "Comprehensive summary of the groundbreaking paper that introduced the Transformer architecture. Includes key insights, mathematical formulations, and practical implications.",
      source: "AI Research Library",
      relevanceScore: 0.92,
      lastUpdated: "2024-01-12",
      tags: ["research", "transformers", "attention"],
    },
    {
      id: 3,
      title: "Building a Transformer from Scratch",
      type: "Tutorial",
      description:
        "Step-by-step guide to implementing a transformer model using PyTorch. Includes code examples, explanations of each component, and training tips.",
      source: "AI Tutorials",
      relevanceScore: 0.89,
      lastUpdated: "2024-01-10",
      tags: ["pytorch", "implementation", "tutorial"],
    },
    {
      id: 4,
      title: "Transformer Models in Hugging Face",
      type: "Tool Documentation",
      description:
        "Complete guide to using pre-trained transformer models from Hugging Face. Covers model selection, fine-tuning, and deployment strategies.",
      source: "Hugging Face Docs",
      relevanceScore: 0.87,
      lastUpdated: "2024-01-08",
      tags: ["huggingface", "pre-trained", "deployment"],
    },
    {
      id: 5,
      title: "Optimizing Transformer Performance",
      type: "Best Practices",
      description:
        "Advanced techniques for optimizing transformer model performance including gradient checkpointing, mixed precision training, and efficient attention mechanisms.",
      source: "ML Engineering Guide",
      relevanceScore: 0.84,
      lastUpdated: "2024-01-05",
      tags: ["optimization", "performance", "engineering"],
    },
  ]

  const recentSearches = [
    "transformer architecture",
    "BERT fine-tuning",
    "attention mechanisms",
    "GPT training",
    "neural networks",
  ]

  const popularTopics = [
    { name: "Large Language Models", count: 1240 },
    { name: "Computer Vision", count: 890 },
    { name: "Reinforcement Learning", count: 650 },
    { name: "Natural Language Processing", count: 1100 },
    { name: "Deep Learning", count: 1560 },
    { name: "Machine Learning", count: 2100 },
  ]

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Course Lesson":
        return <BookOpen className="h-4 w-4" />
      case "Research Paper":
        return <ExternalLink className="h-4 w-4" />
      case "Tutorial":
        return <BookOpen className="h-4 w-4" />
      case "Tool Documentation":
        return <ExternalLink className="h-4 w-4" />
      default:
        return <BookOpen className="h-4 w-4" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Course Lesson":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case "Research Paper":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
      case "Tutorial":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "Tool Documentation":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
      default:
        return "bg-slate-100 text-slate-800 dark:bg-slate-900 dark:text-slate-200"
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">AI Knowledge Search</h1>
        <p className="text-muted-foreground">
          Semantic search powered by AI to find relevant courses, papers, and resources
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search for AI concepts, techniques, papers, or tools..."
            className="pl-12 text-lg h-14"
            defaultValue="transformer architecture"
          />
          <Button className="absolute right-2 top-2 h-10">Search</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Search Results */}
        <div className="lg:col-span-3">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold">Search Results</h2>
              <p className="text-sm text-muted-foreground">Found 127 results for "transformer architecture"</p>
            </div>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
          </div>

          <div className="space-y-6">
            {searchResults.map((result) => (
              <Card key={result.id} className="hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge className={getTypeColor(result.type)}>{result.type}</Badge>
                        <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span>{result.relevanceScore.toFixed(2)} relevance</span>
                        </div>
                      </div>
                      <CardTitle className="text-lg hover:text-primary cursor-pointer transition-colors">
                        {result.title}
                      </CardTitle>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground mt-1">
                        {getTypeIcon(result.type)}
                        <span>{result.source}</span>
                        <span>•</span>
                        <Clock className="h-3 w-3" />
                        <span>{result.lastUpdated}</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">{result.description}</CardDescription>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {result.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <Button variant="outline" size="sm">
                      <ExternalLink className="mr-2 h-3 w-3" />
                      View
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button variant="outline" size="lg">
              Load More Results
            </Button>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Recent Searches */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Searches</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {recentSearches.map((search, index) => (
                  <Button key={index} variant="ghost" className="w-full justify-start text-sm h-8">
                    <Search className="mr-2 h-3 w-3" />
                    {search}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Popular Topics */}
          <Card>
            <CardHeader>
              <CardTitle>Popular Topics</CardTitle>
              <CardDescription>Trending in AI research and learning</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {popularTopics.map((topic, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <Button variant="ghost" className="flex-1 justify-start text-sm h-8 p-0">
                      {topic.name}
                    </Button>
                    <Badge variant="secondary" className="text-xs">
                      {topic.count}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Search Tips */}
          <Card>
            <CardHeader>
              <CardTitle>Search Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm">
                <div className="font-medium mb-1">Use specific terms</div>
                <div className="text-muted-foreground">"transformer attention" instead of "AI models"</div>
              </div>
              <div className="text-sm">
                <div className="font-medium mb-1">Ask questions</div>
                <div className="text-muted-foreground">"How do transformers work?" or "What is BERT?"</div>
              </div>
              <div className="text-sm">
                <div className="font-medium mb-1">Use quotes</div>
                <div className="text-muted-foreground">"neural network" for exact phrase matching</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
