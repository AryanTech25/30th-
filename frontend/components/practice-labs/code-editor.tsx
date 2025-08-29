"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import { Play, Download, RotateCcw, CheckCircle, XCircle, Clock, Code } from "lucide-react"

interface TestCase {
  input: string
  expectedOutput: string
  description: string
}

interface LabExercise {
  id: string
  title: string
  description: string
  language: string
  starterCode: string
  solution: string
  testCases: TestCase[]
  hints: string[]
}

interface CodeEditorProps {
  exercise: LabExercise
  onComplete?: (success: boolean) => void
}

export function CodeEditor({ exercise, onComplete }: CodeEditorProps) {
  const [code, setCode] = useState(exercise.starterCode)
  const [output, setOutput] = useState("")
  const [isRunning, setIsRunning] = useState(false)
  const [testResults, setTestResults] = useState<{ passed: boolean; output: string; expected: string }[]>([])
  const [showHints, setShowHints] = useState(false)
  const [currentHint, setCurrentHint] = useState(0)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Simulate code execution
   const executeCode = async (codeToRun: string, input = ""): Promise<string> => {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 25000);

      const res = await fetch("/api/run-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: codeToRun,
          language: exercise.language,
          stdin: input,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeout);

      const json = await res.json();

      if (!res.ok) {
        const serverError = json?.error ?? json?.message ?? res.statusText;
        return `Error: ${serverError}`;
      }

      // JDoodle outputs often have trailing newline - normalize
      const out = json.output ?? (json.raw && json.raw.output) ?? "";
      return String(out).replace(/\r\n/g, "\n");
    } catch (err: any) {
      if (err.name === "AbortError") return "Error: Execution timed out (25s)";
      return `Error: ${err?.message ?? "Unknown error"}`;
    }
  };


   const runCode = async () => {
    setIsRunning(true);
    setOutput("");
    try {
      const result = await executeCode(code);
      setOutput(result);
    } finally {
      setIsRunning(false);
    }
  };

  const runTests = async () => {
    setIsRunning(true);
    setTestResults([]);
    const results: { passed: boolean; output: string; expected: string }[] = [];

    for (const testCase of exercise.testCases) {
      const out = await executeCode(code, testCase.input ?? "");
      // normalize output/expected for comparison
      const normalize = (s: string) => s.replace(/\r\n/g, "\n").trim();
      const passed = normalize(out) === normalize(testCase.expectedOutput);
      results.push({ passed, output: out, expected: testCase.expectedOutput });
    }

    setTestResults(results);
    setIsRunning(false);

    if (results.every((r) => r.passed) && onComplete) onComplete(true);
  };


  const resetCode = () => {
    setCode(exercise.starterCode)
    setOutput("")
    setTestResults([])
  }

  const downloadCode = () => {
    const element = document.createElement("a")
    const file = new Blob([code], { type: "text/plain" })
    element.href = URL.createObjectURL(file)
    element.download = `${exercise.id}.${exercise.language === "python" ? "py" : "js"}`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  const insertTab = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault()
      const textarea = e.currentTarget
      const start = textarea.selectionStart
      const end = textarea.selectionEnd

      const newValue = code.substring(0, start) + "    " + code.substring(end)
      setCode(newValue)

      // Set cursor position after the inserted tab
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 4
      }, 0)
    }
  }

  return (
    <div className="space-y-6">
      {/* Exercise Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Code className="h-5 w-5" />
              {exercise.title}
            </CardTitle>
            <Badge variant="outline">{exercise.language}</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{exercise.description}</p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Code Editor */}
        <Card className="flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-lg">Code Editor</CardTitle>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={resetCode}>
                <RotateCcw className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={downloadCode}>
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="flex-1">
            <div className="space-y-4">
              <div className="relative">
                <Textarea
                  ref={textareaRef}
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  onKeyDown={insertTab}
                  className="font-mono text-sm min-h-[400px] resize-none"
                  placeholder="Write your code here..."
                />
              </div>

              <div className="flex space-x-2">
                <Button onClick={runCode} disabled={isRunning} className="flex-1">
                  {isRunning ? (
                    <>
                      <Clock className="mr-2 h-4 w-4 animate-spin" />
                      Running...
                    </>
                  ) : (
                    <>
                      <Play className="mr-2 h-4 w-4" />
                      Run Code
                    </>
                  )}
                </Button>
                <Button onClick={runTests} disabled={isRunning} variant="outline">
                  Run Tests
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Output and Tests */}
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="text-lg">Output & Tests</CardTitle>
          </CardHeader>
          <CardContent className="flex-1">
            <Tabs defaultValue="output" className="h-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="output">Output</TabsTrigger>
                <TabsTrigger value="tests">Tests</TabsTrigger>
                <TabsTrigger value="hints">Hints</TabsTrigger>
              </TabsList>

              <TabsContent value="output" className="mt-4">
                <ScrollArea className="h-[350px] w-full rounded-md border p-4">
                  <pre className="text-sm font-mono whitespace-pre-wrap">
                    {output || "Run your code to see output here..."}
                  </pre>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="tests" className="mt-4">
                <ScrollArea className="h-[350px] w-full">
                  {testResults.length > 0 ? (
                    <div className="space-y-3">
                      {testResults.map((result, index) => (
                        <Card key={index} className={`border ${result.passed ? "border-green-200" : "border-red-200"}`}>
                          <CardContent className="p-4">
                            <div className="flex items-center gap-2 mb-2">
                              {result.passed ? (
                                <CheckCircle className="h-4 w-4 text-green-500" />
                              ) : (
                                <XCircle className="h-4 w-4 text-red-500" />
                              )}
                              <span className="font-medium">Test {index + 1}</span>
                              <Badge variant={result.passed ? "default" : "destructive"}>
                                {result.passed ? "Passed" : "Failed"}
                              </Badge>
                            </div>
                            <div className="text-sm space-y-1">
                              <div>
                                <span className="font-medium">Expected:</span> {result.expected}
                              </div>
                              <div>
                                <span className="font-medium">Got:</span> {result.output}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center text-muted-foreground py-8">
                      <p>Run tests to see results here...</p>
                    </div>
                  )}
                </ScrollArea>
              </TabsContent>

              <TabsContent value="hints" className="mt-4">
                <ScrollArea className="h-[350px] w-full">
                  <div className="space-y-4">
                    {exercise.hints.map((hint, index) => (
                      <Card key={index} className={index <= currentHint ? "" : "opacity-50"}>
                        <CardContent className="p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline">Hint {index + 1}</Badge>
                          </div>
                          <p className="text-sm">{hint}</p>
                        </CardContent>
                      </Card>
                    ))}
                    {currentHint < exercise.hints.length - 1 && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentHint(currentHint + 1)}
                        className="w-full"
                      >
                        Show Next Hint
                      </Button>
                    )}
                  </div>
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}