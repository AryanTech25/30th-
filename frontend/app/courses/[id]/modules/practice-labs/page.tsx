"use client"

import { useParams } from "next/navigation"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CodeEditor } from "@/components/practice-labs/code-editor"
import { ArrowLeft, Play, Trophy, Target, CheckCircle, Code } from "lucide-react"
import Link from "next/link"

const courseLabsData = {
  "1": {
    // Generative AI
    title: "Generative AI Practice Labs",
    description: "Hands-on coding exercises for building generative AI applications",
    labs: [
      {
        id: "gpt-basics",
        title: "GPT API Integration",
        description: "Learn to integrate and use GPT models for text generation",
        language: "python",
        difficulty: "Beginner",
        duration: "45 minutes",
        exercises: [
          {
            id: "gpt-hello",
            title: "First GPT API Call",
            description: "Make your first API call to GPT and generate text responses.",
            language: "python",
            starterCode: `# Import required libraries
import openai

# Set up your API key (use environment variable in production)
# openai.api_key = "your-api-key-here"

# Create a simple text generation function
def generate_text(prompt):
    # Your code here to call GPT API
    # Return the generated text
    pass

# Test your function
prompt = "Explain machine learning in simple terms"
result = generate_text(prompt)
print(result)`,
            solution: `import openai

def generate_text(prompt):
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": prompt}],
        max_tokens=150
    )
    return response.choices[0].message.content

prompt = "Explain machine learning in simple terms"
result = generate_text(prompt)
print(result)`,
            testCases: [
              {
                input: "",
                expectedOutput: "Machine learning is a method of teaching computers to learn patterns from data...",
                description: "Should generate explanatory text about ML",
              },
            ],
            hints: [
              "Use openai.ChatCompletion.create() for GPT API calls",
              "Set the model parameter to 'gpt-3.5-turbo'",
              "Structure messages as a list with role and content",
            ],
          },
        ],
      },
    ],
  },
  "2": {
    // Agentic AI
    title: "Agentic AI Practice Labs",
    description: "Build autonomous AI agents with reasoning and planning capabilities",
    labs: [
      {
        id: "simple-agent",
        title: "Basic AI Agent",
        description: "Create a simple AI agent that can make decisions",
        language: "python",
        difficulty: "Intermediate",
        duration: "60 minutes",
        exercises: [
          {
            id: "decision-agent",
            title: "Decision Making Agent",
            description: "Build an agent that can make simple decisions based on input conditions.",
            language: "python",
            starterCode: `class SimpleAgent:
    def __init__(self, name):
        self.name = name
        self.knowledge = {}
    
    def perceive(self, environment):
        # Agent perceives the environment
        # Your code here
        pass
    
    def decide(self, perception):
        # Agent makes decisions based on perception
        # Your code here
        pass
    
    def act(self, decision):
        # Agent takes action based on decision
        # Your code here
        pass

# Create and test your agent
agent = SimpleAgent("TestBot")
environment = {"temperature": 25, "weather": "sunny", "time": "morning"}

# Test the agent's decision making
perception = agent.perceive(environment)
decision = agent.decide(perception)
action = agent.act(decision)

print(f"Agent {agent.name} decided to: {action}")`,
            solution: `class SimpleAgent:
    def __init__(self, name):
        self.name = name
        self.knowledge = {
            "hot_threshold": 30,
            "cold_threshold": 15
        }
    
    def perceive(self, environment):
        return {
            "temp": environment.get("temperature", 20),
            "weather": environment.get("weather", "unknown"),
            "time": environment.get("time", "unknown")
        }
    
    def decide(self, perception):
        temp = perception["temp"]
        weather = perception["weather"]
        
        if temp > self.knowledge["hot_threshold"]:
            return "seek_shade"
        elif temp < self.knowledge["cold_threshold"]:
            return "find_warmth"
        elif weather == "sunny":
            return "go_outside"
        else:
            return "stay_inside"
    
    def act(self, decision):
        actions = {
            "seek_shade": "Moving to a cooler location",
            "find_warmth": "Looking for a warmer place",
            "go_outside": "Going outside to enjoy the weather",
            "stay_inside": "Staying indoors"
        }
        return actions.get(decision, "No action taken")

agent = SimpleAgent("TestBot")
environment = {"temperature": 25, "weather": "sunny", "time": "morning"}

perception = agent.perceive(environment)
decision = agent.decide(perception)
action = agent.act(decision)

print(f"Agent {agent.name} decided to: {action}")`,
            testCases: [
              {
                input: "",
                expectedOutput: "Agent TestBot decided to: Going outside to enjoy the weather",
                description: "Should make appropriate decision based on environment",
              },
            ],
            hints: [
              "Implement perceive() to extract relevant information from environment",
              "Use conditional logic in decide() to make choices",
              "Map decisions to actions in act() method",
            ],
          },
        ],
      },
    ],
  },
  "3": {
    // Machine Learning
    title: "Machine Learning Practice Labs",
    description: "Implement ML algorithms and work with real datasets",
    labs: [
      {
        id: "ml-classification",
        title: "Classification Models",
        description: "Build and evaluate classification models using scikit-learn",
        language: "python",
        difficulty: "Intermediate",
        duration: "75 minutes",
        exercises: [
          {
            id: "iris-classifier",
            title: "Iris Flower Classification",
            description: "Build a classifier to predict iris flower species using the famous iris dataset.",
            language: "python",
            starterCode: `from sklearn import datasets
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report
import numpy as np

# Load the iris dataset
iris = datasets.load_iris()
X = iris.data  # Features
y = iris.target  # Target labels

# Split the dataset into training and testing sets
# Your code here

# Create and train a Random Forest classifier
# Your code here

# Make predictions on the test set
# Your code here

# Calculate and print the accuracy
# Your code here

print("Classification completed!")`,
            solution: `from sklearn import datasets
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report
import numpy as np

iris = datasets.load_iris()
X = iris.data
y = iris.target

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

classifier = RandomForestClassifier(n_estimators=100, random_state=42)
classifier.fit(X_train, y_train)

y_pred = classifier.predict(X_test)

accuracy = accuracy_score(y_test, y_pred)
print(f"Accuracy: {accuracy:.2f}")
print("\\nClassification Report:")
print(classification_report(y_test, y_pred, target_names=iris.target_names))

print("Classification completed!")`,
            testCases: [
              {
                input: "",
                expectedOutput: "Accuracy: 1.00\nClassification completed!",
                description: "Should achieve high accuracy on iris classification",
              },
            ],
            hints: [
              "Use train_test_split to divide your data",
              "RandomForestClassifier works well for this dataset",
              "Use accuracy_score to evaluate your model",
            ],
          },
        ],
      },
    ],
  },
  "4": {
    // Cybersecurity
    title: "Cybersecurity Practice Labs",
    description: "Hands-on security exercises and penetration testing scenarios",
    labs: [
      {
        id: "password-security",
        title: "Password Security Analysis",
        description: "Analyze password strength and implement security measures",
        language: "python",
        difficulty: "Intermediate",
        duration: "50 minutes",
        exercises: [
          {
            id: "password-analyzer",
            title: "Password Strength Analyzer",
            description: "Create a comprehensive password strength analyzer with security recommendations.",
            language: "python",
            starterCode: `import re
import hashlib

class PasswordAnalyzer:
    def __init__(self):
        self.common_passwords = ["password", "123456", "admin", "qwerty"]
    
    def check_length(self, password):
        # Check if password meets length requirements
        # Your code here
        pass
    
    def check_complexity(self, password):
        # Check for uppercase, lowercase, digits, special chars
        # Your code here
        pass
    
    def check_common_patterns(self, password):
        # Check against common passwords and patterns
        # Your code here
        pass
    
    def generate_score(self, password):
        # Generate overall security score (0-100)
        # Your code here
        pass
    
    def analyze(self, password):
        # Main analysis function
        # Your code here
        pass

# Test the analyzer
analyzer = PasswordAnalyzer()
test_passwords = ["weak", "StrongPass123!", "password123"]

for pwd in test_passwords:
    result = analyzer.analyze(pwd)
    print(f"Password: {pwd}")
    print(f"Analysis: {result}")
    print("-" * 30)`,
            solution: `import re
import hashlib

class PasswordAnalyzer:
    def __init__(self):
        self.common_passwords = ["password", "123456", "admin", "qwerty"]
    
    def check_length(self, password):
        length = len(password)
        if length >= 12:
            return {"score": 25, "message": "Excellent length"}
        elif length >= 8:
            return {"score": 15, "message": "Good length"}
        else:
            return {"score": 0, "message": "Too short"}
    
    def check_complexity(self, password):
        score = 0
        checks = []
        
        if re.search(r'[a-z]', password):
            score += 10
            checks.append("lowercase")
        if re.search(r'[A-Z]', password):
            score += 10
            checks.append("uppercase")
        if re.search(r'\\d', password):
            score += 10
            checks.append("digits")
        if re.search(r'[!@#$%^&*(),.?":{}|<>]', password):
            score += 15
            checks.append("special chars")
        
        return {"score": score, "checks": checks}
    
    def check_common_patterns(self, password):
        lower_pwd = password.lower()
        
        if lower_pwd in self.common_passwords:
            return {"score": -50, "message": "Common password detected"}
        
        if re.search(r'(.)\\1{2,}', password):
            return {"score": -10, "message": "Repeated characters"}
        
        return {"score": 0, "message": "No common patterns"}
    
    def generate_score(self, password):
        length_result = self.check_length(password)
        complexity_result = self.check_complexity(password)
        pattern_result = self.check_common_patterns(password)
        
        total_score = length_result["score"] + complexity_result["score"] + pattern_result["score"]
        return max(0, min(100, total_score))
    
    def analyze(self, password):
        score = self.generate_score(password)
        
        if score >= 80:
            strength = "Very Strong"
        elif score >= 60:
            strength = "Strong"
        elif score >= 40:
            strength = "Medium"
        else:
            strength = "Weak"
        
        return {
            "strength": strength,
            "score": score,
            "length": len(password),
            "recommendations": self._get_recommendations(password)
        }
    
    def _get_recommendations(self, password):
        recommendations = []
        
        if len(password) < 8:
            recommendations.append("Use at least 8 characters")
        if not re.search(r'[A-Z]', password):
            recommendations.append("Add uppercase letters")
        if not re.search(r'[a-z]', password):
            recommendations.append("Add lowercase letters")
        if not re.search(r'\\d', password):
            recommendations.append("Add numbers")
        if not re.search(r'[!@#$%^&*(),.?":{}|<>]', password):
            recommendations.append("Add special characters")
        
        return recommendations

analyzer = PasswordAnalyzer()
test_passwords = ["weak", "StrongPass123!", "password123"]

for pwd in test_passwords:
    result = analyzer.analyze(pwd)
    print(f"Password: {pwd}")
    print(f"Strength: {result['strength']} (Score: {result['score']})")
    if result['recommendations']:
        print(f"Recommendations: {', '.join(result['recommendations'])}")
    print("-" * 30)`,
            testCases: [
              {
                input: "",
                expectedOutput:
                  "Password: weak\nStrength: Weak (Score: 10)\nRecommendations: Use at least 8 characters, Add uppercase letters, Add numbers, Add special characters",
                description: "Should analyze password strength correctly",
              },
            ],
            hints: [
              "Use regular expressions to check for character types",
              "Implement a scoring system based on multiple criteria",
              "Provide specific recommendations for improvement",
            ],
          },
        ],
      },
    ],
  },
}

export default function PracticeLabsPage() {
  const params = useParams()
  const courseId = params.id as string
  const [selectedLab, setSelectedLab] = useState<any>(null)
  const [completedLabs, setCompletedLabs] = useState<string[]>([])

  const courseData = courseLabsData[courseId as keyof typeof courseLabsData]

  if (!courseData) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Practice Labs Not Available</h1>
          <Button asChild>
            <Link href={`/courses/${courseId}`}>Back to Course</Link>
          </Button>
        </div>
      </div>
    )
  }

  const handleLabComplete = (labId: string) => {
    if (!completedLabs.includes(labId)) {
      setCompletedLabs([...completedLabs, labId])
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <Button variant="ghost" asChild className="mb-6">
        <Link href={`/courses/${courseId}`}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Course
        </Link>
      </Button>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{courseData.title}</h1>
        <p className="text-muted-foreground">{courseData.description}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Labs Completed</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedLabs.length}</div>
            <p className="text-xs text-muted-foreground">out of {courseData.labs.length} available</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Language</CardTitle>
            <Code className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Python</div>
            <p className="text-xs text-muted-foreground">Primary language</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Exercises</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {courseData.labs.reduce((acc, lab) => acc + lab.exercises.length, 0)}
            </div>
            <p className="text-xs text-muted-foreground">Hands-on coding</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94%</div>
            <p className="text-xs text-muted-foreground">Average completion</p>
          </CardContent>
        </Card>
      </div>

      {selectedLab ? (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <Button variant="outline" onClick={() => setSelectedLab(null)}>
              ← Back to Labs
            </Button>
            <Badge variant="outline">{selectedLab.difficulty}</Badge>
          </div>
          <CodeEditor
            exercise={selectedLab.exercises[0]}
            onComplete={(success) => {
              if (success) {
                handleLabComplete(selectedLab.id)
              }
            }}
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courseData.labs.map((lab) => (
            <Card key={lab.id} className="group hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{lab.title}</CardTitle>
                  {completedLabs.includes(lab.id) && <CheckCircle className="h-5 w-5 text-green-500" />}
                </div>
                <CardDescription>{lab.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <Badge
                    variant={
                      lab.difficulty === "Beginner"
                        ? "secondary"
                        : lab.difficulty === "Intermediate"
                          ? "default"
                          : "destructive"
                    }
                  >
                    {lab.difficulty}
                  </Badge>
                  <span className="text-muted-foreground">{lab.duration}</span>
                </div>

                <div className="flex items-center justify-between">
                  <Badge variant="outline">{lab.language}</Badge>
                  <Badge variant="outline">{lab.exercises.length} exercises</Badge>
                </div>

                <Button onClick={() => setSelectedLab(lab)} className="w-full">
                  <Play className="mr-2 h-4 w-4" />
                  {completedLabs.includes(lab.id) ? "Practice Again" : "Start Lab"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
