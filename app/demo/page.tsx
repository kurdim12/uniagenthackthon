"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Calendar, MessageSquare, ArrowRight, Sparkles, CheckCircle2, Play, FileText, Download } from "lucide-react";
import Link from "next/link";

export default function DemoPage() {
  const router = useRouter();
  const [completedPaths, setCompletedPaths] = useState<Set<string>>(new Set());

  const goldenPaths = [
    {
      id: "pdf-flashcards",
      title: "PDF → Flashcards",
      description: "Upload a PDF and watch it automatically generate spaced repetition flashcards using SM-2 algorithm",
      icon: BookOpen,
      steps: [
        "Navigate to Courses → CS101 → Materials",
        "Upload a PDF file (or use existing materials)",
        "Go to Flashcards tab",
        "Click 'Generate from Notes' to create flashcards",
        "Review flashcards with spaced repetition"
      ],
      path: "/courses/course-1",
      tab: "flashcards",
      color: "bg-blue-500/10 text-blue-600 border-blue-500/20",
    },
    {
      id: "ical-export",
      title: "Study Plan → iCal Export",
      description: "AI-powered study planning with one-click calendar export for Google Calendar, Outlook, or Apple Calendar",
      icon: Calendar,
      steps: [
        "Go to Study Plan page",
        "Click 'Replan with AI' to optimize your schedule",
        "View your weekly timeline",
        "Export to calendar via Settings → Export Calendar",
        "Import .ics file into your favorite calendar app"
      ],
      path: "/study-plan",
      color: "bg-green-500/10 text-green-600 border-green-500/20",
    },
    {
      id: "tutor-rag",
      title: "Tutor → RAG Q&A",
      description: "Ask questions about your course materials with retrieval-augmented generation and citation bubbles",
      icon: MessageSquare,
      steps: [
        "Navigate to Courses → CS101 → Tutor",
        "Ask: 'Explain Big-O notation from the materials'",
        "AI searches course materials using TF-IDF",
        "Get response with citations to source materials",
        "See workflow visualization of agent reasoning"
      ],
      path: "/courses/course-1",
      tab: "tutor",
      color: "bg-purple-500/10 text-purple-600 border-purple-500/20",
    },
  ];

  const handleTryPath = (path: { path: string; tab?: string }) => {
    const url = path.tab ? `${path.path}?tab=${path.tab}` : path.path;
    router.push(url);
  };

  const markComplete = (id: string) => {
    setCompletedPaths(prev => {
      const newSet = new Set(prev);
      newSet.add(id);
      return newSet;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Golden Path Demos</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Experience UNI-Agent in 3 Clicks
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Try these three powerful workflows that showcase the platform's AI capabilities
            </p>
          </div>

          {/* Golden Paths */}
          <div className="space-y-6">
            {goldenPaths.map((path, idx) => {
              const Icon = path.icon;
              const isComplete = completedPaths.has(path.id);
              
              return (
                <Card 
                  key={path.id} 
                  className={`border-2 transition-all hover:shadow-lg ${path.color}`}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="p-3 rounded-lg bg-primary/10">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <CardTitle className="text-2xl">{path.title}</CardTitle>
                            {isComplete && (
                              <Badge variant="default" className="gap-1">
                                <CheckCircle2 className="w-3 h-3" />
                                Completed
                              </Badge>
                            )}
                          </div>
                          <CardDescription className="text-base">
                            {path.description}
                          </CardDescription>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-lg font-bold px-3 py-1">
                        {idx + 1}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Steps */}
                      <div className="space-y-3">
                        <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
                          Steps
                        </h3>
                        <ol className="space-y-2">
                          {path.steps.map((step, stepIdx) => (
                            <li key={stepIdx} className="flex items-start gap-3">
                              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-medium">
                                {stepIdx + 1}
                              </span>
                              <span className="text-sm text-foreground">{step}</span>
                            </li>
                          ))}
                        </ol>
                      </div>

                      {/* Actions */}
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground mb-3">
                            Try It Now
                          </h3>
                          <div className="space-y-2">
                            <Button
                              onClick={() => handleTryPath(path)}
                              className="w-full min-h-[44px]"
                              size="lg"
                            >
                              <Play className="mr-2 h-4 w-4" />
                              Launch Demo
                            </Button>
                            <Button
                              variant="outline"
                              onClick={() => markComplete(path.id)}
                              className="w-full min-h-[44px]"
                            >
                              <CheckCircle2 className="mr-2 h-4 w-4" />
                              Mark as Complete
                            </Button>
                          </div>
                        </div>

                        {/* Features */}
                        <div className="pt-4 border-t">
                          <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground mb-2">
                            Key Features
                          </h3>
                          <ul className="space-y-1 text-sm text-muted-foreground">
                            {path.id === "pdf-flashcards" && (
                              <>
                                <li>• PDF text extraction</li>
                                <li>• SM-2 spaced repetition algorithm</li>
                                <li>• Automatic flashcard generation</li>
                              </>
                            )}
                            {path.id === "ical-export" && (
                              <>
                                <li>• AI-powered schedule optimization</li>
                                <li>• Conflict detection</li>
                                <li>• iCal format export</li>
                              </>
                            )}
                            {path.id === "tutor-rag" && (
                              <>
                                <li>• TF-IDF document retrieval</li>
                                <li>• Citation bubbles</li>
                                <li>• Multi-agent orchestration</li>
                              </>
                            )}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Footer Actions */}
          <div className="mt-12 text-center space-y-4">
            <p className="text-muted-foreground">
              Ready to explore the full platform?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={() => router.push("/auth/signin")}>
                <ArrowRight className="mr-2 h-4 w-4" />
                Enter Full Demo
              </Button>
              <Button size="lg" variant="outline" onClick={() => router.push("/landing")}>
                <ArrowRight className="mr-2 h-4 w-4" />
                Back to Landing
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

