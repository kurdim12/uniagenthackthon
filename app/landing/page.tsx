"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Sparkles, Calendar, MessageSquare, ArrowRight, Play, CheckCircle2, Zap } from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  const router = useRouter();

  const features = [
    {
      icon: Sparkles,
      title: "AI-Powered Learning",
      description: "7 specialized AI agents help you study smarter, not harder",
    },
    {
      icon: Calendar,
      title: "Smart Study Planning",
      description: "AI optimizes your schedule and detects conflicts automatically",
    },
    {
      icon: BookOpen,
      title: "Course Management",
      description: "Organize materials, assignments, exams, and notes in one place",
    },
    {
      icon: MessageSquare,
      title: "Intelligent Tutor",
      description: "Ask questions about your course materials with RAG-powered responses",
    },
  ];

  const goldenPaths = [
    {
      title: "PDF → Flashcards",
      description: "Upload PDFs and automatically generate spaced repetition flashcards",
      icon: BookOpen,
      path: "/courses/course-1?tab=flashcards",
    },
    {
      title: "Study Plan → iCal Export",
      description: "AI-powered study planning with calendar integration",
      path: "/study-plan",
      icon: Calendar,
    },
    {
      title: "Tutor → RAG Q&A",
      description: "Ask questions with retrieval-augmented generation and citations",
      path: "/courses/course-1?tab=tutor",
      icon: MessageSquare,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">AI-Powered Academic Assistant</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              UNI-Agent
            </span>
            <br />
            Your Intelligent Study Companion
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Transform your academic journey with AI-powered course management, 
            intelligent study planning, and personalized tutoring—all in one beautiful platform.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              onClick={() => router.push("/auth/signin")}
              className="min-h-[44px] px-8 text-lg"
            >
              <Play className="mr-2 h-5 w-5" />
              Enter Demo
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => router.push("/demo")}
              className="min-h-[44px] px-8 text-lg"
            >
              <ArrowRight className="mr-2 h-5 w-5" />
              See Golden Paths
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-20 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <Card key={idx} className="border-2 hover:shadow-lg transition-all hover:border-primary/50">
                <CardContent className="p-6">
                  <div className="p-3 rounded-lg bg-primary/10 w-fit mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Golden Paths Demo */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Try the Golden Paths</h2>
            <p className="text-muted-foreground text-lg">
              Experience the power of AI-driven learning in three quick demos
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
            {goldenPaths.map((path, idx) => {
              const Icon = path.icon;
              return (
                <Card 
                  key={idx} 
                  className="group cursor-pointer hover:shadow-xl transition-all border-2 hover:border-primary/50"
                  onClick={() => router.push(path.path)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-gradient-to-br from-primary/20 to-purple-600/20 group-hover:scale-110 transition-transform">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-2">{path.title}</h3>
                        <p className="text-sm text-muted-foreground mb-4">{path.description}</p>
                        <div className="flex items-center gap-2 text-primary text-sm font-medium group-hover:gap-4 transition-all">
                          <span>Try it</span>
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Tech Stack */}
        <div className="mt-20 text-center">
          <p className="text-sm text-muted-foreground mb-4">Built with</p>
          <div className="flex flex-wrap justify-center gap-4 text-xs text-muted-foreground">
            <span className="px-3 py-1 rounded-full bg-card border">Next.js 14</span>
            <span className="px-3 py-1 rounded-full bg-card border">TypeScript</span>
            <span className="px-3 py-1 rounded-full bg-card border">Tailwind CSS</span>
            <span className="px-3 py-1 rounded-full bg-card border">shadcn/ui</span>
            <span className="px-3 py-1 rounded-full bg-card border">OpenAI</span>
            <span className="px-3 py-1 rounded-full bg-card border">Supabase</span>
          </div>
        </div>
      </div>
    </div>
  );
}

