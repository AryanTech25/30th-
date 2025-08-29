import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Download, ExternalLink, Star, Clock, Code, Database, Zap, Filter } from "lucide-react"

export default function HackathonPage() {
  const resources = [
    {
      id: 1,
      title: "OpenAI API Starter Template",
      description:
        "Ready-to-use template for building applications with OpenAI's API including authentication and rate limiting.",
      category: "Template",
      type: "Code",
      difficulty: "Beginner",
      estimatedTime: 30,
      provider: "OpenAI",
      tags: ["openai", "api", "template", "nodejs"],
      stats: { views: 5420, downloads: 1250, likes: 340 },
      featured: true,
      url: "https://github.com/openai/openai-quickstart-node",
    },
    {
      id: 2,
      title: "Computer Vision Dataset Collection",
      description:
        "Curated collection of computer vision datasets for image classification, object detection, and segmentation.",
      category: "Dataset",
      type: "Link",
      difficulty: "Intermediate",
      estimatedTime: 60,
      provider: "Papers with Code",
      tags: ["computer-vision", "dataset", "image-classification"],
      stats: { views: 3200, downloads: 0, likes: 280 },
      featured: false,
      url: "https://paperswithcode.com/datasets?task=computer-vision",
    },
    {
      id: 3,
      title: "Hugging Face Transformers Quick Start",
      description: "Complete guide to using pre-trained transformer models for NLP tasks with code examples.",
      category: "Tutorial",
      type: "Video",
      difficulty: "Beginner",
      estimatedTime: 45,
      provider: "Hugging Face",
      tags: ["transformers", "nlp", "huggingface", "tutorial"],
      stats: { views: 8900, downloads: 0, likes: 567 },
      featured: true,
      url: "https://huggingface.co/docs/transformers/quicktour",
    },
    {
      id: 4,
      title: "LangChain RAG Implementation",
      description: "Build a Retrieval-Augmented Generation system using LangChain and vector databases.",
      category: "Tool",
      type: "Code",
      difficulty: "Advanced",
      estimatedTime: 120,
      provider: "LangChain",
      tags: ["langchain", "rag", "vector-db", "llm"],
      stats: { views: 2100, downloads: 890, likes: 234 },
      featured: false,
      url: "https://python.langchain.com/docs/use_cases/question_answering",
    },
    {
      id: 5,
      title: "Stable Diffusion Fine-tuning Guide",
      description: "Step-by-step tutorial for fine-tuning Stable Diffusion models on custom datasets.",
      category: "Tutorial",
      type: "Link",
      difficulty: "Advanced",
      estimatedTime: 180,
      provider: "Stability AI",
      tags: ["stable-diffusion", "fine-tuning", "image-generation"],
      stats: { views: 4500, downloads: 0, likes: 456 },
      featured: true,
      url: "https://stability.ai/blog/stable-diffusion-fine-tuning",
    },
    {
      id: 6,
      title: "MLOps Pipeline Template",
      description: "Production-ready MLOps pipeline with CI/CD, monitoring, and deployment automation.",
      category: "Template",
      type: "Code",
      difficulty: "Expert",
      estimatedTime: 240,
      provider: "MLOps Community",
      tags: ["mlops", "cicd", "monitoring", "deployment"],
      stats: { views: 1800, downloads: 450, likes: 189 },
      featured: false,
      url: "https://github.com/mlops-guide/mlops-pipeline",
    },
  ]

  const categories = [
    { name: "All", count: 156 },
    { name: "Templates", count: 45 },
    { name: "Datasets", count: 38 },
    { name: "APIs", count: 29 },
    { name: "Tools", count: 24 },
    { name: "Tutorials", count: 20 },
  ]

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Code":
        return <Code className="h-4 w-4" />
      case "Dataset":
        return <Database className="h-4 w-4" />
      case "Link":
        return <ExternalLink className="h-4 w-4" />
      case "Video":
        return <Zap className="h-4 w-4" />
      default:
        return <Code className="h-4 w-4" />
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "Advanced":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
      case "Expert":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      default:
        return "bg-slate-100 text-slate-800 dark:bg-slate-900 dark:text-slate-200"
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Hackathon Resources</h1>
        <p className="text-muted-foreground">
          Curated collection of tools, datasets, APIs, and templates to accelerate your AI hackathon projects
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search resources, tools, datasets..." className="pl-10" />
        </div>
        <Select>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="templates">Templates</SelectItem>
            <SelectItem value="datasets">Datasets</SelectItem>
            <SelectItem value="apis">APIs</SelectItem>
            <SelectItem value="tools">Tools</SelectItem>
            <SelectItem value="tutorials">Tutorials</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Difficulty" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Levels</SelectItem>
            <SelectItem value="beginner">Beginner</SelectItem>
            <SelectItem value="intermediate">Intermediate</SelectItem>
            <SelectItem value="advanced">Advanced</SelectItem>
            <SelectItem value="expert">Expert</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          More Filters
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Featured Resources */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Featured Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {resources
                .filter((resource) => resource.featured)
                .map((resource) => (
                  <Card
                    key={resource.id}
                    className="group hover:shadow-lg transition-all duration-300 border-2 border-primary/20"
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <Badge variant="secondary">Featured</Badge>
                            <Badge className={getDifficultyColor(resource.difficulty)}>{resource.difficulty}</Badge>
                          </div>
                          <CardTitle className="text-lg group-hover:text-primary transition-colors">
                            {resource.title}
                          </CardTitle>
                          <div className="flex items-center space-x-2 text-sm text-muted-foreground mt-1">
                            {getTypeIcon(resource.type)}
                            <span>{resource.category}</span>
                            <span>•</span>
                            <span>{resource.provider}</span>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <CardDescription>{resource.description}</CardDescription>

                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>{resource.estimatedTime} min</span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <Star className="h-3 w-3" />
                            <span>{resource.stats.likes}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Download className="h-3 w-3" />
                            <span>{resource.stats.downloads}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {resource.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex space-x-2">
                        <Button asChild className="flex-1">
                          <a href={resource.url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Access Resource
                          </a>
                        </Button>
                        <Button variant="outline" size="sm">
                          <Star className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>

          {/* All Resources */}
          <div>
            <h2 className="text-xl font-semibold mb-4">All Resources</h2>
            <div className="space-y-4">
              {resources.map((resource) => (
                <Card key={resource.id} className="group hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="h-12 w-12 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 rounded-lg flex items-center justify-center">
                        {getTypeIcon(resource.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <Badge variant="outline">{resource.category}</Badge>
                              <Badge className={getDifficultyColor(resource.difficulty)}>{resource.difficulty}</Badge>
                              {resource.featured && <Badge variant="secondary">Featured</Badge>}
                            </div>
                            <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                              {resource.title}
                            </h3>
                            <p className="text-muted-foreground text-sm mt-1">{resource.description}</p>
                            <div className="flex items-center space-x-2 text-sm text-muted-foreground mt-2">
                              <span>{resource.provider}</span>
                              <span>•</span>
                              <Clock className="h-3 w-3" />
                              <span>{resource.estimatedTime} min</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-2">
                              <div className="flex items-center space-x-1">
                                <Star className="h-3 w-3" />
                                <span>{resource.stats.likes}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Download className="h-3 w-3" />
                                <span>{resource.stats.downloads}</span>
                              </div>
                            </div>
                            <Button asChild size="sm">
                              <a href={resource.url} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="mr-2 h-3 w-3" />
                                Access
                              </a>
                            </Button>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-3">
                          {resource.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Categories */}
          <Card>
            <CardHeader>
              <CardTitle>Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {categories.map((category) => (
                  <div key={category.name} className="flex items-center justify-between">
                    <Button variant="ghost" className="flex-1 justify-start text-sm h-8 p-0">
                      {category.name}
                    </Button>
                    <Badge variant="secondary" className="text-xs">
                      {category.count}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Start Guide */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Start Guide</CardTitle>
              <CardDescription>New to AI hackathons?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm">
                <div className="font-medium mb-1">1. Choose your stack</div>
                <div className="text-muted-foreground">Pick templates and tools that match your skills</div>
              </div>
              <div className="text-sm">
                <div className="font-medium mb-1">2. Find datasets</div>
                <div className="text-muted-foreground">Browse our curated dataset collection</div>
              </div>
              <div className="text-sm">
                <div className="font-medium mb-1">3. Build and deploy</div>
                <div className="text-muted-foreground">Use our deployment guides and templates</div>
              </div>
              <Button className="w-full" size="sm">
                View Full Guide
              </Button>
            </CardContent>
          </Card>

          {/* Popular Tags */}
          <Card>
            <CardHeader>
              <CardTitle>Popular Tags</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-1">
                {[
                  "openai",
                  "huggingface",
                  "pytorch",
                  "tensorflow",
                  "langchain",
                  "stable-diffusion",
                  "computer-vision",
                  "nlp",
                ].map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="text-xs cursor-pointer hover:bg-primary hover:text-primary-foreground"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
