"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

interface Course {
  id: string
  title: string
  description: string
  instructor: string
  duration: string
  level: string
  category: string
  image: string
  modules: Module[]
  tags: string[]
  rating: number
  students: number
  price: number
}

interface Module {
  id: string
  title: string
  description: string
  duration: string
  videoUrl?: string
  documentationUrl?: string
  quiz?: Quiz
}

interface Quiz {
  id: string
  questions: Question[]
}

interface Question {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

interface Tool {
  id: number
  name: string
  description: string
  category: string
  pricing: string
  rating: number
  reviews: number
  popularity: number
  logo: string
  tags: string[]
  features: string[]
  website: string
}

interface CareerPath {
  id: string
  title: string
  description: string
  duration: string
  difficulty: string
  salary: string
  growth: string
  skills: string[]
  courses: string[]
  jobs: string[]
  icon: string
  level: string
  avgSalary: string
  matchScore: number
  requiredCourses: string[]
  companies: string[]
  learningPath: {
    courseId: string
    title: string
    duration: string
  }[]
}

interface LeaderboardEntry {
  id: string
  name: string
  avatar: string
  points: number
  level: string
  coursesCompleted: number
  streak: number
  badges: string[]
  rank: number
}

interface Achievement {
  id: string
  name: string
  description: string
  icon: string
  earned: boolean
  earnedAt?: Date
  category: string
}

interface CyberScenario {
  id: number
  title: string
  description: string
  difficulty: string
  duration: string
  participants: number
  completionRate: number
  icon: string
  status: string
  progress: number
  objectives: string[]
  scenario: string
}

interface Mentor {
  name: string
  role: string
  expertise: string[]
  rating: number
  sessions: number
  avatar: string
}

interface DataContextType {
  courses: Course[]
  tools: Tool[]
  careerPaths: CareerPath[]
  leaderboard: LeaderboardEntry[]
  achievements: Achievement[]
  cyberScenarios: CyberScenario[]
  loading: boolean
  getCourse: (id: string) => Course | undefined
  getTool: (id: number) => Tool | undefined
  getCareerPath: (id: string) => CareerPath | undefined
  getCareerPaths: () => CareerPath[]
  getMentors: () => Mentor[]
  getLeaderboard: () => any[]
  updateCourseData: (courses: Course[]) => void
  updateToolsData: (tools: Tool[]) => void
}

const DataContext = createContext<DataContextType | undefined>(undefined)

export function useData() {
  const context = useContext(DataContext)
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider")
  }
  return context
}

const initialCourses: Course[] = [
  {
    id: "ml-fundamentals",
    title: "Machine Learning Fundamentals",
    description: "Master the core concepts of machine learning with hands-on projects and real-world applications.",
    instructor: "Dr. Sarah Chen",
    duration: "8 weeks",
    level: "Beginner",
    category: "Machine Learning",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.8,
    students: 12543,
    price: 99,
    tags: ["Python", "Scikit-learn", "Data Science"],
    modules: [
      {
        id: "intro-ml",
        title: "Introduction to Machine Learning",
        description: "Understanding the basics of ML and its applications",
        duration: "45 minutes",
        quiz: {
          id: "intro-ml-quiz",
          questions: [
            {
              id: "q1",
              question: "What is machine learning?",
              options: [
                "A type of computer programming",
                "A method for computers to learn from data",
                "A database management system",
                "A web development framework",
              ],
              correctAnswer: 1,
              explanation:
                "Machine learning is a method that allows computers to learn and make decisions from data without being explicitly programmed for every scenario.",
            },
          ],
        },
      },
    ],
  },
  {
    id: "cybersecurity-basics",
    title: "Cybersecurity Fundamentals",
    description: "Learn essential cybersecurity concepts and protect against modern threats.",
    instructor: "Prof. Michael Rodriguez",
    duration: "6 weeks",
    level: "Beginner",
    category: "Cybersecurity",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.7,
    students: 8932,
    price: 89,
    tags: ["Security", "Network Security", "Ethical Hacking"],
    modules: [
      {
        id: "cyber-intro",
        title: "Introduction to Cybersecurity",
        description: "Understanding cybersecurity landscape and threats",
        duration: "40 minutes",
        quiz: {
          id: "cyber-intro-quiz",
          questions: [
            {
              id: "q1",
              question: "What is the primary goal of cybersecurity?",
              options: [
                "To make computers faster",
                "To protect digital assets from threats",
                "To create new software",
                "To manage databases",
              ],
              correctAnswer: 1,
              explanation:
                "The primary goal of cybersecurity is to protect digital assets, systems, and data from cyber threats and unauthorized access.",
            },
          ],
        },
      },
    ],
  },
]

const initialTools: Tool[] = [
  {
    id: 1,
    name: "OpenAI GPT-4",
    description: "Advanced language model for text generation, coding assistance, and analysis.",
    category: "Language Models",
    pricing: "Paid",
    rating: 4.7,
    reviews: 15420,
    popularity: 95,
    logo: "/placeholder.svg?height=40&width=40",
    tags: ["NLP", "Text Generation", "API"],
    features: ["Advanced reasoning", "Code completion", "Multi-language support"],
    website: "https://chat.openai.com",
  },
  {
    id: 2,
    name: "Claude AI",
    description: "Anthropic's AI assistant focused on being helpful, harmless, and honest.",
    category: "Language Models",
    pricing: "Freemium",
    rating: 4.5,
    reviews: 8750,
    popularity: 88,
    logo: "/placeholder.svg?height=40&width=40",
    tags: ["Conversational AI", "Safety", "Analysis"],
    features: ["Long context", "Constitutional AI", "Code analysis"],
    website: "https://claude.ai",
  },
  {
    id: 3,
    name: "Midjourney",
    description: "AI-powered image generation tool for creating stunning artwork and designs.",
    category: "Computer Vision",
    pricing: "Paid",
    rating: 4.6,
    reviews: 12300,
    popularity: 92,
    logo: "/placeholder.svg?height=40&width=40",
    tags: ["Image Generation", "Art", "Creative"],
    features: ["Text-to-image", "Style variations", "High quality"],
    website: "https://midjourney.com",
  },
  {
    id: 4,
    name: "GitHub Copilot",
    description: "AI pair programmer that helps you write code faster and with fewer errors.",
    category: "Development Tools",
    pricing: "Paid",
    rating: 4.4,
    reviews: 6890,
    popularity: 85,
    logo: "/placeholder.svg?height=40&width=40",
    tags: ["Code Generation", "IDE", "Programming"],
    features: ["Code completion", "Multi-language", "Context aware"],
    website: "https://github.com/features/copilot",
  },
  {
    id: 5,
    name: "Hugging Face",
    description: "Open-source platform with thousands of pre-trained AI models and datasets.",
    category: "ML Libraries",
    pricing: "Freemium",
    rating: 4.5,
    reviews: 4560,
    popularity: 78,
    logo: "/placeholder.svg?height=40&width=40",
    tags: ["Open Source", "Models", "Community"],
    features: ["Pre-trained models", "Model sharing", "Datasets"],
    website: "https://huggingface.co",
  },
  {
    id: 6,
    name: "Stable Diffusion",
    description: "Open-source text-to-image generation model for creative applications.",
    category: "Computer Vision",
    pricing: "Free",
    rating: 4.3,
    reviews: 3240,
    popularity: 72,
    logo: "/placeholder.svg?height=40&width=40",
    tags: ["Image Generation", "Open Source", "Diffusion"],
    features: ["Text-to-image", "Local deployment", "Customizable"],
    website: "https://stability.ai",
  },
  {
    id: 7,
    name: "Perplexity AI",
    description: "AI-powered search engine that provides accurate answers with citations.",
    category: "Search & Research",
    pricing: "Freemium",
    rating: 4.4,
    reviews: 2890,
    popularity: 76,
    logo: "/placeholder.svg?height=40&width=40",
    tags: ["Search", "Research", "Citations"],
    features: ["Real-time search", "Source citations", "Follow-up questions"],
    website: "https://perplexity.ai",
  },
  {
    id: 8,
    name: "Runway ML",
    description: "Creative AI tools for video editing, image generation, and content creation.",
    category: "Creative Tools",
    pricing: "Freemium",
    rating: 4.2,
    reviews: 1950,
    popularity: 68,
    logo: "/placeholder.svg?height=40&width=40",
    tags: ["Video", "Creative", "Generation"],
    features: ["Video generation", "Image editing", "AI effects"],
    website: "https://runwayml.com",
  },
  {
    id: 9,
    name: "Jasper AI",
    description: "AI writing assistant for marketing copy, blog posts, and content creation.",
    category: "Content Creation",
    pricing: "Paid",
    rating: 4.1,
    reviews: 3450,
    popularity: 74,
    logo: "/placeholder.svg?height=40&width=40",
    tags: ["Writing", "Marketing", "Content"],
    features: ["Content templates", "Brand voice", "SEO optimization"],
    website: "https://jasper.ai",
  },
  {
    id: 10,
    name: "Notion AI",
    description: "AI-powered writing and productivity features integrated into Notion workspace.",
    category: "Productivity",
    pricing: "Freemium",
    rating: 4.3,
    reviews: 2780,
    popularity: 71,
    logo: "/placeholder.svg?height=40&width=40",
    tags: ["Productivity", "Writing", "Workspace"],
    features: ["Writing assistance", "Summarization", "Task automation"],
    website: "https://notion.so",
  },
  {
    id: 11,
    name: "Character.AI",
    description: "Create and chat with AI characters for entertainment and creative purposes.",
    category: "Entertainment",
    pricing: "Freemium",
    rating: 4.0,
    reviews: 5670,
    popularity: 69,
    logo: "/placeholder.svg?height=40&width=40",
    tags: ["Characters", "Chat", "Entertainment"],
    features: ["Character creation", "Roleplay", "Community"],
    website: "https://character.ai",
  },
  {
    id: 12,
    name: "Replicate",
    description: "Run machine learning models in the cloud with simple API access.",
    category: "ML Platform",
    pricing: "Pay-per-use",
    rating: 4.2,
    reviews: 1230,
    popularity: 65,
    logo: "/placeholder.svg?height=40&width=40",
    tags: ["API", "Cloud", "Models"],
    features: ["Model hosting", "API access", "Scalable inference"],
    website: "https://replicate.com",
  },
]

const initialCareerPaths: CareerPath[] = [
  {
    id: "ml-engineer",
    title: "Machine Learning Engineer",
    description: "Design and implement ML systems that can learn and make predictions from data.",
    duration: "6-12 months",
    difficulty: "Intermediate",
    salary: "$120k - $180k",
    growth: "22% (Much faster than average)",
    skills: ["Python", "TensorFlow", "PyTorch", "Statistics", "Data Engineering"],
    courses: ["ml-fundamentals", "deep-learning", "data-engineering"],
    jobs: ["ML Engineer", "Data Scientist", "AI Researcher"],
    icon: "brain",
    level: "Intermediate",
    avgSalary: "$120k - $180k",
    matchScore: 85,
    requiredCourses: ["1", "2", "3"],
    companies: ["Google", "Meta", "OpenAI", "Microsoft", "Amazon"],
    learningPath: [
      {
        courseId: "1",
        title: "Generative AI Fundamentals",
        duration: "12 hours",
      },
      {
        courseId: "2",
        title: "Agentic AI Systems",
        duration: "15 hours",
      },
      {
        courseId: "3",
        title: "Machine Learning Mastery",
        duration: "18 hours",
      },
    ],
  },
  {
    id: "cybersecurity-analyst",
    title: "Cybersecurity Analyst",
    description: "Protect organizations from cyber threats and security breaches.",
    duration: "4-8 months",
    difficulty: "Beginner",
    salary: "$85k - $130k",
    growth: "31% (Much faster than average)",
    skills: ["Network Security", "Incident Response", "Risk Assessment", "Compliance"],
    courses: ["cybersecurity-basics", "network-security", "ethical-hacking"],
    jobs: ["Security Analyst", "SOC Analyst", "Security Consultant"],
    icon: "shield",
    level: "Beginner",
    avgSalary: "$85k - $130k",
    matchScore: 78,
    requiredCourses: ["4", "1"],
    companies: ["CrowdStrike", "Palo Alto Networks", "Cisco", "IBM", "Accenture"],
    learningPath: [
      {
        courseId: "4",
        title: "Cybersecurity Essentials",
        duration: "14 hours",
      },
      {
        courseId: "1",
        title: "Generative AI Fundamentals",
        duration: "12 hours",
      },
    ],
  },
  {
    id: "ai-researcher",
    title: "AI Researcher",
    description: "Advance the field of artificial intelligence through research and innovation.",
    duration: "12-24 months",
    difficulty: "Advanced",
    salary: "$140k - $250k",
    growth: "15% (Faster than average)",
    skills: ["Deep Learning", "Research Methods", "Mathematics", "Publications"],
    courses: ["ml-fundamentals", "deep-learning", "research-methods"],
    jobs: ["Research Scientist", "AI Researcher", "Principal Scientist"],
    icon: "microscope",
    level: "Advanced",
    avgSalary: "$140k - $250k",
    matchScore: 92,
    requiredCourses: ["1", "2", "3"],
    companies: ["OpenAI", "DeepMind", "Anthropic", "Meta AI", "Google Research"],
    learningPath: [
      {
        courseId: "1",
        title: "Generative AI Fundamentals",
        duration: "12 hours",
      },
      {
        courseId: "2",
        title: "Agentic AI Systems",
        duration: "15 hours",
      },
      {
        courseId: "3",
        title: "Machine Learning Mastery",
        duration: "18 hours",
      },
    ],
  },
]

const initialLeaderboard: LeaderboardEntry[] = [
  {
    id: "1",
    name: "Alex Chen",
    avatar: "/placeholder.svg?height=40&width=40",
    points: 15420,
    level: "Expert",
    coursesCompleted: 12,
    streak: 45,
    badges: ["Early Adopter", "Course Master", "Streak Champion"],
    rank: 1,
  },
  {
    id: "2",
    name: "Sarah Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    points: 14890,
    level: "Expert",
    coursesCompleted: 11,
    streak: 32,
    badges: ["AI Specialist", "Security Expert"],
    rank: 2,
  },
  {
    id: "3",
    name: "Michael Rodriguez",
    avatar: "/placeholder.svg?height=40&width=40",
    points: 13750,
    level: "Advanced",
    coursesCompleted: 9,
    streak: 28,
    badges: ["Code Warrior", "ML Practitioner"],
    rank: 3,
  },
]

const initialAchievements: Achievement[] = [
  {
    id: "first-course",
    name: "First Steps",
    description: "Complete your first course",
    icon: "trophy",
    earned: true,
    earnedAt: new Date("2024-01-15"),
    category: "Learning",
  },
  {
    id: "streak-7",
    name: "Week Warrior",
    description: "Maintain a 7-day learning streak",
    icon: "flame",
    earned: true,
    earnedAt: new Date("2024-01-22"),
    category: "Consistency",
  },
  {
    id: "ml-master",
    name: "ML Master",
    description: "Complete all machine learning courses",
    icon: "brain",
    earned: false,
    category: "Expertise",
  },
]

const initialCyberScenarios: CyberScenario[] = [
  {
    id: 1,
    title: "Phishing Email Detection",
    description: "Learn to identify and respond to sophisticated phishing attempts targeting AI companies.",
    difficulty: "Beginner",
    duration: "15 minutes",
    participants: 2340,
    completionRate: 87,
    icon: "shield",
    status: "available",
    progress: 0,
    objectives: [
      "Identify suspicious email indicators",
      "Analyze email headers and links",
      "Report phishing attempts properly",
      "Educate team members on threats",
    ],
    scenario:
      "You receive an urgent email claiming to be from your AI model provider asking for immediate credential verification...",
  },
  {
    id: 2,
    title: "SQL Injection Attack",
    description: "Practice defending against SQL injection attacks on machine learning model databases.",
    difficulty: "Intermediate",
    duration: "25 minutes",
    participants: 1560,
    completionRate: 72,
    icon: "alert-triangle",
    status: "available",
    progress: 45,
    objectives: [
      "Identify SQL injection vulnerabilities",
      "Implement input validation",
      "Use parameterized queries",
      "Monitor database access logs",
    ],
    scenario:
      "Your ML training data database is showing unusual query patterns. Investigate potential SQL injection attempts...",
  },
]

const initialMentors: Mentor[] = [
  {
    name: "Dr. Sarah Chen",
    role: "Senior ML Engineer at Google",
    expertise: ["Deep Learning", "Computer Vision", "MLOps"],
    rating: 4.9,
    sessions: 150,
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    name: "Michael Rodriguez",
    role: "Data Science Manager at Meta",
    expertise: ["Data Science", "Leadership", "Product Analytics"],
    rating: 4.8,
    sessions: 89,
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    name: "Dr. Emily Watson",
    role: "AI Research Scientist at OpenAI",
    expertise: ["NLP", "Research", "Publications"],
    rating: 4.9,
    sessions: 67,
    avatar: "/placeholder.svg?height=60&width=60",
  },
]

const initialLeaderboardData = [
  {
    rank: 1,
    previousRank: 2,
    name: "GPT-4 Turbo",
    organization: "OpenAI",
    score: 94.2,
    model: "gpt-4-turbo-preview",
    benchmark: "MMLU",
    submissionDate: "2024-01-15",
    verified: true,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    rank: 2,
    previousRank: 1,
    name: "Claude-3 Opus",
    organization: "Anthropic",
    score: 93.8,
    model: "claude-3-opus",
    benchmark: "MMLU",
    submissionDate: "2024-01-12",
    verified: true,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    rank: 3,
    previousRank: 3,
    name: "Gemini Ultra",
    organization: "Google",
    score: 92.5,
    model: "gemini-ultra",
    benchmark: "MMLU",
    submissionDate: "2024-01-10",
    verified: true,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    rank: 4,
    previousRank: 5,
    name: "LLaMA-2 70B",
    organization: "Meta",
    score: 89.7,
    model: "llama-2-70b-chat",
    benchmark: "MMLU",
    submissionDate: "2024-01-08",
    verified: true,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    rank: 5,
    previousRank: 4,
    name: "PaLM 2",
    organization: "Google",
    score: 88.9,
    model: "palm-2-large",
    benchmark: "MMLU",
    submissionDate: "2024-01-05",
    verified: true,
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [courses, setCourses] = useState<Course[]>([])
  const [tools, setTools] = useState<Tool[]>([])
  const [careerPaths, setCareerPaths] = useState<CareerPath[]>([])
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [cyberScenarios, setCyberScenarios] = useState<CyberScenario[]>([])
  const [mentors, setMentors] = useState<Mentor[]>([])
  const [leaderboardData, setLeaderboardData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Load all data from localStorage or use initial data
    const loadData = () => {
      const storedCourses = localStorage.getItem("aiverse_courses")
      const storedTools = localStorage.getItem("aiverse_tools")
      const storedCareerPaths = localStorage.getItem("aiverse_career_paths")
      const storedLeaderboard = localStorage.getItem("aiverse_leaderboard")
      const storedAchievements = localStorage.getItem("aiverse_achievements")
      const storedCyberScenarios = localStorage.getItem("aiverse_cyber_scenarios")
      const storedMentors = localStorage.getItem("aiverse_mentors")
      const storedLeaderboardData = localStorage.getItem("aiverse_leaderboard_data")

      setCourses(storedCourses ? JSON.parse(storedCourses) : initialCourses)
      setTools(storedTools ? JSON.parse(storedTools) : initialTools)
      setCareerPaths(storedCareerPaths ? JSON.parse(storedCareerPaths) : initialCareerPaths)
      setLeaderboard(storedLeaderboard ? JSON.parse(storedLeaderboard) : initialLeaderboard)
      setAchievements(storedAchievements ? JSON.parse(storedAchievements) : initialAchievements)
      setCyberScenarios(storedCyberScenarios ? JSON.parse(storedCyberScenarios) : initialCyberScenarios)
      setMentors(storedMentors ? JSON.parse(storedMentors) : initialMentors)
      setLeaderboardData(storedLeaderboardData ? JSON.parse(storedLeaderboardData) : initialLeaderboardData)

      // Save initial data if not exists
      if (!storedCourses) localStorage.setItem("aiverse_courses", JSON.stringify(initialCourses))
      if (!storedTools) localStorage.setItem("aiverse_tools", JSON.stringify(initialTools))
      if (!storedCareerPaths) localStorage.setItem("aiverse_career_paths", JSON.stringify(initialCareerPaths))
      if (!storedLeaderboard) localStorage.setItem("aiverse_leaderboard", JSON.stringify(initialLeaderboard))
      if (!storedAchievements) localStorage.setItem("aiverse_achievements", JSON.stringify(initialAchievements))
      if (!storedCyberScenarios) localStorage.setItem("aiverse_cyber_scenarios", JSON.stringify(initialCyberScenarios))
      if (!storedMentors) localStorage.setItem("aiverse_mentors", JSON.stringify(initialMentors))
      if (!storedLeaderboardData)
        localStorage.setItem("aiverse_leaderboard_data", JSON.stringify(initialLeaderboardData))

      setLoading(false)
    }

    loadData()
  }, [])

  const getCourse = (id: string) => {
    return courses.find((course) => course.id === id)
  }

  const getTool = (id: number) => {
    return tools.find((tool) => tool.id === id)
  }

  const getCareerPath = (id: string) => {
    return careerPaths.find((path) => path.id === id)
  }

  const getCareerPaths = () => {
    return careerPaths
  }

  const getMentors = () => {
    return mentors
  }

  const getLeaderboard = () => {
    return leaderboardData
  }

  const updateCourseData = (newCourses: Course[]) => {
    setCourses(newCourses)
    localStorage.setItem("aiverse_courses", JSON.stringify(newCourses))
  }

  const updateToolsData = (newTools: Tool[]) => {
    setTools(newTools)
    localStorage.setItem("aiverse_tools", JSON.stringify(newTools))
  }

  const value: DataContextType = {
    courses,
    tools,
    careerPaths,
    leaderboard,
    achievements,
    cyberScenarios,
    loading,
    getCourse,
    getTool,
    getCareerPath,
    getCareerPaths,
    getMentors,
    getLeaderboard,
    updateCourseData,
    updateToolsData,
  }

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}
