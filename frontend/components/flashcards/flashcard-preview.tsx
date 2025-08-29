"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { RotateCcw, ChevronLeft, ChevronRight, Brain, Zap } from "lucide-react"

interface Flashcard {
  id: number
  question: string
  answer: string
  category: string
  difficulty: "Easy" | "Medium" | "Hard"
}

const flashcards: Flashcard[] = [
  {
    id: 1,
    question: "What is the primary goal of supervised learning?",
    answer:
      "To learn a mapping from input features to output labels using labeled training data, enabling the model to make predictions on new, unseen data.",
    category: "Machine Learning",
    difficulty: "Easy",
  },
  {
    id: 2,
    question: "Explain the vanishing gradient problem in deep neural networks.",
    answer:
      "The vanishing gradient problem occurs when gradients become exponentially smaller as they propagate backward through layers, making it difficult to train deep networks effectively, especially the earlier layers.",
    category: "Deep Learning",
    difficulty: "Hard",
  },
  {
    id: 3,
    question: "What is the difference between precision and recall?",
    answer:
      "Precision is the ratio of true positives to all predicted positives (TP/(TP+FP)), while recall is the ratio of true positives to all actual positives (TP/(TP+FN)).",
    category: "Machine Learning",
    difficulty: "Medium",
  },
  {
    id: 4,
    question: "What is transfer learning and why is it useful?",
    answer:
      "Transfer learning involves using a pre-trained model on a new, related task. It's useful because it reduces training time, requires less data, and often achieves better performance than training from scratch.",
    category: "Deep Learning",
    difficulty: "Medium",
  },
  {
    id: 5,
    question: "What is the purpose of attention mechanisms in neural networks?",
    answer:
      "Attention mechanisms allow models to focus on relevant parts of the input when making predictions, improving performance on tasks like machine translation and enabling better handling of long sequences.",
    category: "NLP",
    difficulty: "Hard",
  },
]

export default function FlashcardPreview() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [showAnswer, setShowAnswer] = useState(false)

  const currentCard = flashcards[currentIndex]

  const nextCard = () => {
    setCurrentIndex((prev) => (prev + 1) % flashcards.length)
    setIsFlipped(false)
    setShowAnswer(false)
  }

  const prevCard = () => {
    setCurrentIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length)
    setIsFlipped(false)
    setShowAnswer(false)
  }

  const flipCard = () => {
    setIsFlipped(!isFlipped)
    setShowAnswer(!showAnswer)
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "Medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "Hard":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-6 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Brain className="h-5 w-5 text-blue-600" />
          <h3 className="text-xl font-semibold">AI/ML Flashcards</h3>
        </div>
        <p className="text-sm text-muted-foreground">Test your knowledge with interactive flashcards</p>
      </div>

      <div className="relative">
        {/* Card Counter */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <Badge variant="outline">{currentCard.category}</Badge>
            <Badge className={getDifficultyColor(currentCard.difficulty)}>{currentCard.difficulty}</Badge>
          </div>
          <div className="text-sm text-muted-foreground">
            {currentIndex + 1} of {flashcards.length}
          </div>
        </div>

        {/* Flashcard */}
        <Card className="relative h-64 cursor-pointer group" onClick={flipCard}>
          <CardContent className="p-6 h-full flex items-center justify-center">
            <div className="text-center">
              {!showAnswer ? (
                <div>
                  <div className="mb-4">
                    <Zap className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground mb-2">Question</p>
                  </div>
                  <p className="text-lg font-medium leading-relaxed">{currentCard.question}</p>
                  <p className="text-sm text-muted-foreground mt-4 opacity-60 group-hover:opacity-100 transition-opacity">
                    Click to reveal answer
                  </p>
                </div>
              ) : (
                <div>
                  <div className="mb-4">
                    <Brain className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground mb-2">Answer</p>
                  </div>
                  <p className="text-base leading-relaxed">{currentCard.answer}</p>
                  <p className="text-sm text-muted-foreground mt-4 opacity-60 group-hover:opacity-100 transition-opacity">
                    Click to see question
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Controls */}
        <div className="flex justify-between items-center mt-6">
          <Button variant="outline" onClick={prevCard} disabled={flashcards.length <= 1}>
            <ChevronLeft className="h-4 w-4 mr-1" />
            Previous
          </Button>

          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={flipCard}>
              <RotateCcw className="h-4 w-4 mr-1" />
              Flip
            </Button>
          </div>

          <Button variant="outline" onClick={nextCard} disabled={flashcards.length <= 1}>
            Next
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>

        {/* Progress Dots */}
        <div className="flex justify-center mt-4 gap-2">
          {flashcards.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index)
                setIsFlipped(false)
                setShowAnswer(false)
              }}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex
                  ? "bg-blue-600"
                  : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
