"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const SendIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="m22 2-7 20-4-9-9-4Z" />
    <path d="M22 2 11 13" />
  </svg>
)

const BotIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 8V4H8" />
    <rect width="16" height="12" x="4" y="8" rx="2" />
    <path d="m9 16 0 0" />
    <path d="m15 16 0 0" />
  </svg>
)

const UserIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
)

const MessageCircleIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
  </svg>
)

const XIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
)

const MinimizeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M8 3v3a2 2 0 0 1-2 2H3" />
    <path d="M21 8h-3a2 2 0 0 1-2-2V3" />
    <path d="M3 16h3a2 2 0 0 1 2 2v3" />
    <path d="M16 21v-3a2 2 0 0 1 2-2h3" />
  </svg>
)

const MaximizeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M8 3H5a2 2 0 0 0-2 2v3" />
    <path d="M21 8V5a2 2 0 0 0-2-2h-3" />
    <path d="M3 16v3a2 2 0 0 0 2 2h3" />
    <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
  </svg>
)

const SparklesIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.582a.5.5 0 0 1 0 .962L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
  </svg>
)

const AlertTriangleIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />
    <path d="M12 9v4" />
    <path d="m12 17.02.01 0" />
  </svg>
)

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
  isStreaming?: boolean
  isRestricted?: boolean
}

export function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hi! I'm your AI assistant. Ask me about AI/ML, cybersecurity, or AI tools!",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    const saved = localStorage.getItem("chatMessages")
    if (saved) setMessages(JSON.parse(saved))
  }, [])

  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(messages))
  }, [messages])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const simulateStreamingResponse = async (response: string, messageId: string) => {
    const words = response.split(" ")
    let currentContent = ""
    for (let i = 0; i < words.length; i++) {
      currentContent += (i > 0 ? " " : "") + words[i]
      setMessages((prev) => prev.map((m) => (m.id === messageId ? { ...m, content: currentContent } : m)))
      await new Promise((resolve) => setTimeout(resolve, 50 + Math.random() * 100))
    }
    setMessages((prev) => prev.map((m) => (m.id === messageId ? { ...m, isStreaming: false } : m)))
  }

  const handleSendMessage = async () => {
    const messageContent = input.trim()
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

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: "",
      timestamp: new Date(),
      isStreaming: true,
    }

    setMessages((prev) => [...prev, assistantMessage])

    try {
      const res = await fetch("/api/career", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: messageContent }),
      })
      const data = await res.json()
      const responseText = data.answer as string
      await simulateStreamingResponse(responseText, assistantMessage.id)
    } catch {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantMessage.id
            ? { ...m, content: "⚠️ Sorry, something went wrong.", isStreaming: false }
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

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50 opacity-100">
        <Button
          onClick={() => setIsOpen(true)}
          className="h-14 w-14 rounded-full shadow-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
        >
          <MessageCircleIcon />
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 opacity-100">
      <Card className={`w-80 shadow-xl border-2 border-gray-800 bg-white transition-all duration-300 ${isMinimized ? "h-14" : "h-96"}`}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 p-3 bg-gradient-to-r from-purple-700 to-blue-700 text-white rounded-t-lg">
          <div className="flex items-center space-x-2">
            <Avatar className="h-6 w-6">
              <AvatarFallback className="bg-white/20 text-white text-xs">
                <BotIcon />
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-sm opacity-100">AI Assistant</CardTitle>
              <div className="flex items-center space-x-1">
                <div className="h-1.5 w-1.5 bg-green-400 rounded-full"></div>
                <span className="text-xs opacity-100">Online</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-white hover:bg-white/20" onClick={() => setIsMinimized(!isMinimized)}>
              {isMinimized ? <MaximizeIcon /> : <MinimizeIcon />}
            </Button>
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-white hover:bg-white/20" onClick={() => setIsOpen(false)}>
              <XIcon />
            </Button>
          </div>
        </CardHeader>

        {!isMinimized && (
          <CardContent className="p-0 flex flex-col h-80">
            <div className="p-2">
              <Badge variant="secondary" className="text-xs bg-white border border-gray-700">
                <SparklesIcon />
                <span className="ml-1">AI/ML • Security • Tools</span>
              </Badge>
            </div>

            <ScrollArea className="flex-1 px-3">
              <div className="space-y-3 pb-3">
                {messages.map((message) => (
                  <div key={message.id} className={`flex items-start space-x-2 ${message.role === "user" ? "flex-row-reverse space-x-reverse" : ""}`}>
                    <Avatar className="h-6 w-6 flex-shrink-0">
                      {message.role === "user" ? (
                        <AvatarFallback className="bg-blue-600 text-white text-xs">
                          <UserIcon />
                        </AvatarFallback>
                      ) : (
                        <AvatarFallback className="bg-gradient-to-br from-purple-700 to-blue-700 text-white text-xs">
                          <BotIcon />
                        </AvatarFallback>
                      )}
                    </Avatar>

                    <div className={`max-w-[75%] ${message.role === "user" ? "text-right" : ""}`}>
                      <div
                        className={`rounded-lg px-3 py-2 text-xs ${
                          message.role === "user"
                            ? "bg-blue-600 text-white"
                            : message.isRestricted
                              ? "bg-red-900 border border-red-700 text-red-200"
                              : "bg-white"
                        }`}
                      >
                        {message.isRestricted && (
                          <div className="flex items-center gap-1 mb-1 text-red-400">
                            <AlertTriangleIcon />
                            <span className="text-xs font-medium">Topic Restriction</span>
                          </div>
                        )}
                        <div className="whitespace-pre-wrap leading-relaxed">
                          {message.content}
                          {message.isStreaming && <span className="inline-block w-1 h-3 bg-current animate-pulse ml-1 rounded-sm" />}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            <div className="p-3 border-t border-gray-800">
              <div className="flex items-center space-x-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about AI, security, tools..."
                  disabled={isLoading}
                  className="text-xs h-8 bg-white border-gray-700 placeholder-gray-400"
                />
                <Button
                  size="sm"
                  className="h-8 w-8 p-0 bg-blue-600 hover:bg-blue-700"
                  onClick={handleSendMessage}
                  disabled={!input.trim() || isLoading}
                >
                  <SendIcon />
                </Button>
              </div>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  )
}
