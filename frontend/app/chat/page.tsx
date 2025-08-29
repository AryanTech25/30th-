"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Send,
  Bot,
  User,
  Sparkles,
  BookOpen,
  Code,
  Brain,
  Shield,
  Wrench,
  RotateCcw,
  Copy,
  ThumbsUp,
  ThumbsDown,
  AlertTriangle,
  Menu,
  X,
} from "lucide-react"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
  isStreaming?: boolean
  isRestricted?: boolean
}

interface ChatSession {
  id: string
  title: string
  messages: Message[]
  createdAt: Date
  updatedAt: Date
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hello! I'm your specialized AI assistant focused on technology topics. I can help you with:\n\n🤖 **AI & Machine Learning** - Concepts, algorithms, implementations\n🛡️ **Cybersecurity** - Security practices, threat analysis, protection strategies\n🔧 **AI Tools** - Platform comparisons, usage guides, recommendations\n\nWhat would you like to explore today?",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([])
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const suggestedPrompts = [
    {
      icon: <Brain className="h-4 w-4" />,
      text: "Explain neural networks and deep learning",
      category: "AI/ML",
    },
    {
      icon: <Shield className="h-4 w-4" />,
      text: "What are common cybersecurity threats?",
      category: "Security",
    },
    {
      icon: <Wrench className="h-4 w-4" />,
      text: "Compare ChatGPT vs Claude AI capabilities",
      category: "AI Tools",
    },
    {
      icon: <Code className="h-4 w-4" />,
      text: "Help me implement a machine learning model",
      category: "Coding",
    },
    {
      icon: <Shield className="h-4 w-4" />,
      text: "How to secure AI applications?",
      category: "AI Security",
    },
    {
      icon: <BookOpen className="h-4 w-4" />,
      text: "Best practices for data privacy in ML",
      category: "Ethics",
    },
  ]

  const isTopicAllowed = (message: string): boolean => {
    const lowerMessage = message.toLowerCase()

    // AI/ML related keywords
    const aiMlKeywords = [
      "machine learning",
      "ml",
      "artificial intelligence",
      "ai",
      "neural network",
      "deep learning",
      "algorithm",
      "model",
      "training",
      "dataset",
      "supervised",
      "unsupervised",
      "reinforcement",
      "classification",
      "regression",
      "clustering",
      "nlp",
      "computer vision",
      "tensorflow",
      "pytorch",
      "scikit-learn",
      "pandas",
      "numpy",
      "data science",
      "feature",
      "prediction",
      "accuracy",
      "precision",
      "recall",
      "overfitting",
      "underfitting",
      "gradient",
      "backpropagation",
      "transformer",
      "bert",
      "gpt",
      "llm",
      "large language model",
      "generative",
      "diffusion",
    ]

    // Cybersecurity related keywords
    const securityKeywords = [
      "cybersecurity",
      "security",
      "encryption",
      "firewall",
      "malware",
      "virus",
      "phishing",
      "authentication",
      "authorization",
      "vulnerability",
      "threat",
      "attack",
      "breach",
      "password",
      "hashing",
      "ssl",
      "tls",
      "vpn",
      "penetration testing",
      "ethical hacking",
      "intrusion",
      "ddos",
      "ransomware",
      "social engineering",
      "zero-day",
      "exploit",
      "secure coding",
      "owasp",
      "cryptography",
      "digital forensics",
      "incident response",
      "risk assessment",
      "compliance",
      "gdpr",
      "privacy",
      "data protection",
    ]

    // AI Tools related keywords
    const toolKeywords = [
      "chatgpt",
      "claude",
      "midjourney",
      "stable diffusion",
      "hugging face",
      "openai",
      "anthropic",
      "github copilot",
      "jasper",
      "notion ai",
      "perplexity",
      "runway",
      "character.ai",
      "replicate",
      "ai tool",
      "ai platform",
      "api",
      "integration",
      "comparison",
      "recommendation",
      "usage",
      "implementation",
      "deployment",
    ]

    // Programming/Tech related (when combined with AI/ML context)
    const techKeywords = [
      "python",
      "javascript",
      "code",
      "programming",
      "development",
      "software",
      "algorithm",
      "data structure",
      "database",
      "api",
      "framework",
      "library",
    ]

    // Check if message contains any allowed keywords
    const allKeywords = [...aiMlKeywords, ...securityKeywords, ...toolKeywords]
    const hasAllowedKeywords = allKeywords.some((keyword) => lowerMessage.includes(keyword))

    // Also allow tech keywords if they seem to be in AI/ML context
    const hasTechInContext =
      techKeywords.some((keyword) => lowerMessage.includes(keyword)) &&
      (lowerMessage.includes("ai") ||
        lowerMessage.includes("ml") ||
        lowerMessage.includes("model") ||
        lowerMessage.includes("data") ||
        lowerMessage.includes("algorithm"))

    return hasAllowedKeywords || hasTechInContext
  }

  const getMockResponse = (userMessage: string): { content: string; isRestricted: boolean } => {
    const message = userMessage.toLowerCase()

    // Check if topic is allowed
    if (!isTopicAllowed(userMessage)) {
      return {
        content:
          "I'm specialized in technology topics, specifically:\n\n🤖 **AI & Machine Learning** - Algorithms, models, implementations\n🛡️ **Cybersecurity** - Security practices, threat analysis\n🔧 **AI Tools** - Platform comparisons, usage guides\n\nCould you please ask me something related to these areas? I'd be happy to help with any AI/ML concepts, cybersecurity questions, or AI tool recommendations!",
        isRestricted: true,
      }
    }

    // AI/ML responses
    if (message.includes("neural network") || message.includes("deep learning")) {
      return {
        content:
          "Neural networks are the foundation of deep learning! Here's how they work:\n\n**Basic Structure:**\n- **Neurons**: Processing units that receive inputs, apply weights, and produce outputs\n- **Layers**: Input layer → Hidden layers → Output layer\n- **Connections**: Each connection has a weight that gets adjusted during training\n\n**Deep Learning:**\n- Uses multiple hidden layers (hence 'deep')\n- Can learn complex patterns and representations\n- Excels at tasks like image recognition, NLP, and speech processing\n\n**Common Types:**\n- **CNN**: Convolutional Neural Networks for images\n- **RNN/LSTM**: For sequential data like text or time series\n- **Transformers**: Modern architecture powering GPT and BERT\n\nWould you like me to explain any specific aspect in more detail?",
        isRestricted: false,
      }
    }

    if (message.includes("cybersecurity") || message.includes("security threat")) {
      return {
        content:
          "Here are the most common cybersecurity threats organizations face today:\n\n**Top Threats:**\n\n1. **Phishing Attacks** - Fraudulent emails to steal credentials\n2. **Ransomware** - Malware that encrypts data for ransom\n3. **Social Engineering** - Manipulating people to reveal information\n4. **SQL Injection** - Attacking databases through web applications\n5. **DDoS Attacks** - Overwhelming systems with traffic\n6. **Insider Threats** - Risks from employees or contractors\n7. **Zero-Day Exploits** - Attacks on unknown vulnerabilities\n\n**Protection Strategies:**\n- Multi-factor authentication\n- Regular security training\n- Keep software updated\n- Network segmentation\n- Incident response planning\n- Regular security audits\n\nWhich threat would you like to learn more about?",
        isRestricted: false,
      }
    }

    if (message.includes("chatgpt") && message.includes("claude")) {
      return {
        content:
          "Great question! Here's a detailed comparison of ChatGPT vs Claude AI:\n\n**ChatGPT (OpenAI):**\n✅ Excellent for creative writing and brainstorming\n✅ Strong coding assistance and debugging\n✅ Large knowledge base and general versatility\n✅ Plugin ecosystem and web browsing (Plus)\n❌ Can be verbose and sometimes inaccurate\n\n**Claude (Anthropic):**\n✅ More accurate and truthful responses\n✅ Better at following complex instructions\n✅ Stronger ethical reasoning and safety\n✅ Excellent for analysis and research tasks\n❌ More conservative, sometimes overly cautious\n\n**Best Use Cases:**\n- **ChatGPT**: Creative projects, coding, general assistance\n- **Claude**: Research, analysis, sensitive topics, factual accuracy\n\n**Pricing**: Both offer free tiers with paid subscriptions for enhanced features.\n\nWhich specific capabilities are you most interested in?",
        isRestricted: false,
      }
    }

    if (message.includes("secure") && (message.includes("ai") || message.includes("application"))) {
      return {
        content:
          "Securing AI applications is crucial! Here are key security considerations:\n\n**Data Security:**\n- Encrypt training data and model parameters\n- Implement proper access controls\n- Use secure data pipelines\n- Regular data audits and compliance checks\n\n**Model Security:**\n- **Adversarial Attacks**: Protect against malicious inputs\n- **Model Poisoning**: Secure training data sources\n- **Model Extraction**: Prevent unauthorized model copying\n- **Privacy Attacks**: Implement differential privacy\n\n**Infrastructure Security:**\n- Secure API endpoints with authentication\n- Rate limiting and input validation\n- Container security for ML deployments\n- Network segmentation and monitoring\n\n**Best Practices:**\n- Regular security assessments\n- Implement AI governance frameworks\n- Monitor for bias and fairness\n- Maintain audit trails\n- Keep dependencies updated\n\nWould you like me to dive deeper into any of these security aspects?",
        isRestricted: false,
      }
    }

    if (message.includes("implement") && (message.includes("machine learning") || message.includes("model"))) {
      return {
        content:
          "I'd be happy to help you implement a machine learning model! Here's a step-by-step approach:\n\n**1. Define the Problem**\n- Classification, regression, or clustering?\n- What's your target variable?\n- What data do you have available?\n\n**2. Data Preparation**\n```python\nimport pandas as pd\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.preprocessing import StandardScaler\n\n# Load and explore data\ndf = pd.read_csv('your_data.csv')\nprint(df.info())\nprint(df.describe())\n```\n\n**3. Choose Algorithm**\n- **Linear models**: LogisticRegression, LinearRegression\n- **Tree-based**: RandomForest, XGBoost\n- **Neural networks**: MLPClassifier, deep learning\n\n**4. Train and Evaluate**\n```python\nfrom sklearn.ensemble import RandomForestClassifier\nfrom sklearn.metrics import accuracy_score\n\nmodel = RandomForestClassifier()\nmodel.fit(X_train, y_train)\npredictions = model.predict(X_test)\naccuracy = accuracy_score(y_test, predictions)\n```\n\nWhat specific problem are you trying to solve? I can provide more targeted guidance!",
        isRestricted: false,
      }
    }

    // Default tech-focused response
    return {
      content:
        "That's an interesting question about technology! I specialize in:\n\n🤖 **AI & Machine Learning** - From basic concepts to advanced implementations\n🛡️ **Cybersecurity** - Threat analysis, security best practices, and protection strategies\n🔧 **AI Tools** - Comparisons, recommendations, and usage guides\n\nCould you provide more specific details about what you'd like to learn? I can explain algorithms, help with security implementations, recommend AI tools, or assist with technical implementations in these areas.",
      isRestricted: false,
    }
  }

  const simulateStreamingResponse = async (response: string, messageId: string) => {
    const words = response.split(" ")
    let currentContent = ""

    for (let i = 0; i < words.length; i++) {
      currentContent += (i > 0 ? " " : "") + words[i]

      setMessages((prev) => prev.map((m) => (m.id === messageId ? { ...m, content: currentContent } : m)))

      // Simulate typing delay
      await new Promise((resolve) => setTimeout(resolve, 50 + Math.random() * 100))
    }

    // Mark as complete
    setMessages((prev) => prev.map((m) => (m.id === messageId ? { ...m, isStreaming: false } : m)))
  }

  const handleSendMessage = async (messageText?: string) => {
    const messageContent = messageText || input.trim()
    if (!messageContent || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: messageContent,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Add streaming assistant message
    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: "",
      timestamp: new Date(),
      isStreaming: true,
    }

    setMessages((prev) => [...prev, assistantMessage])

    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500))

      const { content: mockResponse, isRestricted } = getMockResponse(messageContent)

      // Update message with restriction flag
      setMessages((prev) => prev.map((m) => (m.id === assistantMessage.id ? { ...m, isRestricted } : m)))

      await simulateStreamingResponse(mockResponse, assistantMessage.id)
    } catch (error) {
      console.error("Chat error:", error)
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantMessage.id
            ? {
                ...m,
                content:
                  "I apologize, but I encountered an error. Please try again with a question about AI/ML, cybersecurity, or AI tools.",
                isStreaming: false,
              }
            : m,
        ),
      )
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const startNewChat = () => {
    setMessages([
      {
        id: "welcome",
        role: "assistant",
        content:
          "Hello! I'm your specialized AI assistant focused on technology topics. I can help you with:\n\n🤖 **AI & Machine Learning** - Concepts, algorithms, implementations\n🛡️ **Cybersecurity** - Security practices, threat analysis, protection strategies\n🔧 **AI Tools** - Platform comparisons, usage guides, recommendations\n\nWhat would you like to explore today?",
        timestamp: new Date(),
      },
    ])
    setCurrentSessionId(null)
  }

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content)
  }

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-background to-muted/20">
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
              {sidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>

            <div className="flex items-center space-x-2">
              <div className="relative">
                <Avatar className="h-8 w-8 border-2 border-primary/20">
                  <AvatarFallback className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
                    <Bot className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-500 rounded-full border-2 border-background"></div>
              </div>
              <div>
                <h1 className="font-semibold text-lg">AIverse Assistant</h1>
                <p className="text-xs text-muted-foreground">AI/ML • Cybersecurity • AI Tools</p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className="hidden sm:flex items-center space-x-1">
              <Sparkles className="h-3 w-3" />
              <span>Specialized AI</span>
            </Badge>
            <Button variant="outline" size="sm" onClick={startNewChat}>
              <RotateCcw className="h-4 w-4" />
              <span className="hidden sm:inline ml-2">New Chat</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 flex relative">
        {sidebarOpen && (
          <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
        )}

        <div
          className={`
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 transition-transform duration-300 ease-in-out
          fixed lg:relative z-50 lg:z-0
          w-80 lg:w-72 h-full bg-background/95 backdrop-blur
          border-r lg:border-r-0 lg:bg-transparent
          flex flex-col
        `}
        >
          <div className="p-4 space-y-4 flex-1 overflow-y-auto">
            <div className="space-y-3">
              <Alert className="border-primary/20 bg-primary/5">
                <AlertTriangle className="h-4 w-4 text-primary" />
                <AlertDescription className="text-xs">
                  I specialize in <strong>AI/ML</strong>, <strong>Cybersecurity</strong>, and <strong>AI Tools</strong>{" "}
                  only.
                </AlertDescription>
              </Alert>

              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Quick Start</h4>
                <div className="grid gap-2">
                  {suggestedPrompts.slice(0, 4).map((prompt, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      size="sm"
                      className="justify-start h-auto p-3 text-left hover:bg-primary/5 border border-transparent hover:border-primary/20 rounded-lg"
                      onClick={() => {
                        handleSendMessage(prompt.text)
                        setSidebarOpen(false)
                      }}
                    >
                      <div className="flex items-start space-x-3 w-full">
                        <div className="p-1 rounded-md bg-primary/10 text-primary">{prompt.icon}</div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-medium text-primary">{prompt.category}</div>
                          <div className="text-xs text-muted-foreground line-clamp-2">{prompt.text}</div>
                        </div>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Recent Chats</h4>
              {chatSessions.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">No previous conversations</p>
              ) : (
                <div className="space-y-1">
                  {chatSessions.map((session) => (
                    <Button
                      key={session.id}
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start h-auto p-2 text-left hover:bg-muted/50"
                      onClick={() => {
                        setCurrentSessionId(session.id)
                        setSidebarOpen(false)
                      }}
                    >
                      <div className="truncate">
                        <div className="text-xs font-medium truncate">{session.title}</div>
                        <div className="text-xs text-muted-foreground">{session.updatedAt.toLocaleDateString()}</div>
                      </div>
                    </Button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col min-w-0">
          {/* Messages Area */}
          <div className="flex-1 relative">
            <ScrollArea className="h-full">
              <div className="max-w-4xl mx-auto px-4 py-6">
                {messages.length === 1 && (
                  <div className="text-center py-12 space-y-6">
                    <div className="relative inline-block">
                      <Avatar className="h-16 w-16 border-4 border-primary/20">
                        <AvatarFallback className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground text-xl">
                          <Bot className="h-8 w-8" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-500 rounded-full border-2 border-background"></div>
                    </div>
                    <div className="space-y-2">
                      <h2 className="text-2xl font-bold">Welcome to AIverse Assistant</h2>
                      <p className="text-muted-foreground max-w-md mx-auto">
                        Your specialized AI companion for technology topics. Ask me anything about AI/ML, cybersecurity,
                        or AI tools!
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-2xl mx-auto">
                      {suggestedPrompts.slice(0, 6).map((prompt, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          className="h-auto p-4 text-left hover:bg-primary/5 hover:border-primary/30 bg-transparent"
                          onClick={() => handleSendMessage(prompt.text)}
                        >
                          <div className="flex items-start space-x-3 w-full">
                            <div className="p-2 rounded-lg bg-primary/10 text-primary">{prompt.icon}</div>
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-medium">{prompt.category}</div>
                              <div className="text-xs text-muted-foreground mt-1 line-clamp-2">{prompt.text}</div>
                            </div>
                          </div>
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="space-y-6">
                  {messages.slice(1).map((message) => (
                    <div
                      key={message.id}
                      className={`flex items-start space-x-4 ${
                        message.role === "user" ? "flex-row-reverse space-x-reverse" : ""
                      }`}
                    >
                      <Avatar className="h-8 w-8 flex-shrink-0">
                        {message.role === "user" ? (
                          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                            <User className="h-4 w-4" />
                          </AvatarFallback>
                        ) : (
                          <AvatarFallback className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
                            <Bot className="h-4 w-4" />
                          </AvatarFallback>
                        )}
                      </Avatar>

                      <div className={`flex-1 max-w-[85%] ${message.role === "user" ? "text-right" : ""}`}>
                        <div
                          className={`rounded-2xl px-4 py-3 ${
                            message.role === "user"
                              ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white ml-auto"
                              : message.isRestricted
                                ? "bg-gradient-to-r from-orange-50 to-orange-100 border border-orange-200 dark:from-orange-950 dark:to-orange-900 dark:border-orange-800"
                                : "bg-muted/50 border border-border/50"
                          }`}
                        >
                          {message.isRestricted && (
                            <div className="flex items-center gap-2 mb-3 text-orange-600 dark:text-orange-400">
                              <AlertTriangle className="h-4 w-4" />
                              <span className="text-xs font-medium">Topic Restriction</span>
                            </div>
                          )}
                          <div className="text-sm whitespace-pre-wrap leading-relaxed">
                            {message.content}
                            {message.isStreaming && (
                              <span className="inline-block w-2 h-5 bg-current animate-pulse ml-1 rounded-sm" />
                            )}
                          </div>
                        </div>

                        <div className="flex items-center justify-between mt-2 px-1">
                          <div className="text-xs text-muted-foreground">
                            {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </div>

                          {message.role === "assistant" && !message.isStreaming && (
                            <div className="flex items-center space-x-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-7 w-7 p-0 hover:bg-muted"
                                onClick={() => copyMessage(message.content)}
                              >
                                <Copy className="h-3 w-3" />
                              </Button>
                              <Button variant="ghost" size="sm" className="h-7 w-7 p-0 hover:bg-muted">
                                <ThumbsUp className="h-3 w-3" />
                              </Button>
                              <Button variant="ghost" size="sm" className="h-7 w-7 p-0 hover:bg-muted">
                                <ThumbsDown className="h-3 w-3" />
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </div>
            </ScrollArea>
          </div>

          <div className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="max-w-4xl mx-auto p-4">
              <div className="relative">
                <div className="flex items-end space-x-3">
                  <div className="flex-1 relative">
                    <Input
                      ref={inputRef}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask about AI/ML, cybersecurity, or AI tools..."
                      disabled={isLoading}
                      className="min-h-[48px] pr-12 py-3 text-base rounded-2xl border-2 focus:border-primary/50 resize-none"
                    />
                    <Button
                      size="sm"
                      className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full"
                      onClick={() => handleSendMessage()}
                      disabled={!input.trim() || isLoading}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="mt-2 text-xs text-muted-foreground text-center">
                  Specialized in AI/ML, Cybersecurity & AI Tools • Press Enter to send
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
