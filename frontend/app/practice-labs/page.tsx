"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CodeEditor } from "@/components/practice-labs/code-editor"
import { FeatureLock } from "@/components/access-control/feature-lock"
import { Code, Play, Trophy, Target, CheckCircle } from "lucide-react"

export default function PracticeLabsPage() {
  const [selectedLab, setSelectedLab] = useState<any>(null)
  const [completedLabs, setCompletedLabs] = useState<string[]>([])

  const labs = [
    {
      id: "python-basics",
      title: "Python Fundamentals",
      description: "Learn Python basics with hands-on exercises",
      language: "python",
      difficulty: "Beginner",
      category: "Programming",
      duration: "30 minutes",
      exercises: [
        {
          id: "hello-world",
          title: "Hello World",
          description: "Write your first Python program that prints 'Hello, World!' to the console.",
          language: "python",
          starterCode: "# Write a program that prints 'Hello, World!'\n# Your code here:\n",
          solution: "print('Hello, World!')",
          testCases: [
            {
              input: "",
              expectedOutput: "Hello, World!",
              description: "Should print Hello, World!",
            },
          ],
          hints: [
            "Use the print() function to output text",
            "Make sure to include the exact text 'Hello, World!' with proper capitalization",
            "Don't forget the comma and exclamation mark",
          ],
        },
      ],
    },
    {
      id: "ml-numpy",
      title: "NumPy for Machine Learning",
      description: "Master NumPy arrays and operations for ML",
      language: "python",
      difficulty: "Intermediate",
      category: "Machine Learning",
      duration: "45 minutes",
      exercises: [
        {
          id: "numpy-arrays",
          title: "Working with NumPy Arrays",
          description: "Create and manipulate NumPy arrays for data processing.",
          language: "python",
          starterCode: `import numpy as np

# Create a NumPy array with values [1.5, 2.3, 4.7, 8.1, 3.2]
# Calculate and print the mean and standard deviation
# Your code here:
`,
          solution: `import numpy as np

arr = np.array([1.5, 2.3, 4.7, 8.1, 3.2])
print(arr)
print(f"Mean: {np.mean(arr):.2f}")
print(f"Std: {np.std(arr):.2f}")`,
          testCases: [
            {
              input: "",
              expectedOutput: "[1.5, 2.3, 4.7, 8.1, 3.2]\nMean: 3.96\nStd: 2.84",
              description: "Should create array and calculate statistics",
            },
          ],
          hints: [
            "Use np.array() to create a NumPy array",
            "Use np.mean() and np.std() for calculations",
            "Format the output to 2 decimal places using :.2f",
          ],
        },
      ],
    },
    {
      id: "ml-sklearn",
      title: "Scikit-learn Basics",
      description: "Build your first machine learning model",
      language: "python",
      difficulty: "Intermediate",
      category: "Machine Learning",
      duration: "60 minutes",
      exercises: [
        {
          id: "simple-classifier",
          title: "Simple Classification Model",
          description: "Build a simple classification model using scikit-learn.",
          language: "python",
          starterCode: `from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

# Sample data (features and labels)
X = [[1, 2], [3, 4], [5, 6], [7, 8], [9, 10]]
y = [0, 1, 0, 1, 0]

# Split the data, train a model, and make predictions
# Your code here:
`,
          solution: `from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

X = [[1, 2], [3, 4], [5, 6], [7, 8], [9, 10]]
y = [0, 1, 0, 1, 0]

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.4, random_state=42)
model = RandomForestClassifier(random_state=42)
model.fit(X_train, y_train)
predictions = model.predict(X_test)
accuracy = accuracy_score(y_test, predictions)

print("Model trained successfully!")
print(f"Accuracy: {accuracy}")
print(f"Predictions: {predictions}")`,
          testCases: [
            {
              input: "",
              expectedOutput: "Model trained successfully!\nAccuracy: 0.95\nPredictions: [1, 0, 1, 1, 0]",
              description: "Should train model and make predictions",
            },
          ],
          hints: [
            "Use train_test_split to split your data",
            "Create a RandomForestClassifier and fit it to training data",
            "Use the trained model to make predictions on test data",
            "Calculate accuracy using accuracy_score",
          ],
        },
      ],
    },
    {
      id: "js-algorithms",
      title: "JavaScript Algorithms",
      description: "Implement common algorithms in JavaScript",
      language: "javascript",
      difficulty: "Intermediate",
      category: "Programming",
      duration: "40 minutes",
      exercises: [
        {
          id: "fibonacci",
          title: "Fibonacci Sequence",
          description: "Implement a function to generate the Fibonacci sequence.",
          language: "javascript",
          starterCode: `// Write a function that generates the first n numbers of the Fibonacci sequence
// and prints them separated by spaces

function fibonacci(n) {
    // Your code here
}

// Test with n = 10
fibonacci(10);
`,
          solution: `function fibonacci(n) {
    let a = 0, b = 1;
    let result = [];
    
    for (let i = 0; i < n; i++) {
        result.push(a);
        [a, b] = [b, a + b];
    }
    
    console.log(result.join(' '));
}

fibonacci(10);`,
          testCases: [
            {
              input: "10",
              expectedOutput: "0 1 1 2 3 5 8 13 21 34",
              description: "Should generate first 10 Fibonacci numbers",
            },
          ],
          hints: [
            "Start with the first two Fibonacci numbers: 0 and 1",
            "Use a loop to generate the sequence",
            "Each number is the sum of the two preceding ones",
            "Use console.log to print the result",
          ],
        },
      ],
    },
    {
      id: "cybersecurity-python",
      title: "Cybersecurity with Python",
      description: "Learn security concepts through Python programming",
      language: "python",
      difficulty: "Advanced",
      category: "Cybersecurity",
      duration: "50 minutes",
      exercises: [
        {
          id: "password-strength",
          title: "Password Strength Checker",
          description: "Create a function to check password strength based on security criteria.",
          language: "python",
          starterCode: `import re

def check_password_strength(password):
    """
    Check password strength based on:
    - At least 8 characters long
    - Contains uppercase and lowercase letters
    - Contains at least one digit
    - Contains at least one special character
    
    Return: "Strong", "Medium", or "Weak"
    """
    # Your code here
    pass

# Test the function
test_passwords = ["weak", "Medium123", "Strong123!"]
for pwd in test_passwords:
    print(f"Password '{pwd}': {check_password_strength(pwd)}")
`,
          solution: `import re

def check_password_strength(password):
    if len(password) < 8:
        return "Weak"
    
    has_upper = bool(re.search(r'[A-Z]', password))
    has_lower = bool(re.search(r'[a-z]', password))
    has_digit = bool(re.search(r'\\d', password))
    has_special = bool(re.search(r'[!@#$%^&*(),.?":{}|<>]', password))
    
    criteria_met = sum([has_upper, has_lower, has_digit, has_special])
    
    if criteria_met >= 4:
        return "Strong"
    elif criteria_met >= 2:
        return "Medium"
    else:
        return "Weak"

test_passwords = ["weak", "Medium123", "Strong123!"]
for pwd in test_passwords:
    print(f"Password '{pwd}': {check_password_strength(pwd)}")`,
          testCases: [
            {
              input: "",
              expectedOutput: "Password 'weak': Weak\nPassword 'Medium123': Medium\nPassword 'Strong123!': Strong",
              description: "Should correctly classify password strength",
            },
          ],
          hints: [
            "Check the length first - passwords under 8 characters are weak",
            "Use regular expressions to check for different character types",
            "Count how many criteria are met to determine strength",
            "Strong passwords meet all 4 criteria, medium passwords meet 2-3",
          ],
        },
      ],
    },
  ]

  const handleLabComplete = (labId: string) => {
    if (!completedLabs.includes(labId)) {
      setCompletedLabs([...completedLabs, labId])
    }
  }

  const labsContent = (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Practice Labs</h1>
        <p className="text-muted-foreground">
          Hands-on coding exercises with integrated compiler and real-time feedback
        </p>
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
            <p className="text-xs text-muted-foreground">out of {labs.length} available</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Languages</CardTitle>
            <Code className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Python & JavaScript</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Categories</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">ML, Security, Programming</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92%</div>
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
            <Badge variant="outline">{selectedLab.category}</Badge>
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
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList>
            <TabsTrigger value="all">All Labs</TabsTrigger>
            <TabsTrigger value="programming">Programming</TabsTrigger>
            <TabsTrigger value="ml">Machine Learning</TabsTrigger>
            <TabsTrigger value="security">Cybersecurity</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {labs.map((lab) => (
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
                      <Badge variant="outline">{lab.category}</Badge>
                    </div>

                    <Button onClick={() => setSelectedLab(lab)} className="w-full">
                      <Play className="mr-2 h-4 w-4" />
                      {completedLabs.includes(lab.id) ? "Practice Again" : "Start Lab"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="programming" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {labs
                .filter((lab) => lab.category === "Programming")
                .map((lab) => (
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

                      <Button onClick={() => setSelectedLab(lab)} className="w-full">
                        <Play className="mr-2 h-4 w-4" />
                        {completedLabs.includes(lab.id) ? "Practice Again" : "Start Lab"}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="ml" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {labs
                .filter((lab) => lab.category === "Machine Learning")
                .map((lab) => (
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

                      <Button onClick={() => setSelectedLab(lab)} className="w-full">
                        <Play className="mr-2 h-4 w-4" />
                        {completedLabs.includes(lab.id) ? "Practice Again" : "Start Lab"}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="security" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {labs
                .filter((lab) => lab.category === "Cybersecurity")
                .map((lab) => (
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

                      <Button onClick={() => setSelectedLab(lab)} className="w-full">
                        <Play className="mr-2 h-4 w-4" />
                        {completedLabs.includes(lab.id) ? "Practice Again" : "Start Lab"}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>
        </Tabs>
      )}
    </div>
  )

  return (
    <FeatureLock
      feature="practice-labs"
      title="Practice Labs"
      description="Complete the introduction modules from AI/ML and Cybersecurity courses to unlock hands-on coding exercises with integrated compiler."
    >
      {labsContent}
    </FeatureLock>
  )
}
